import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addStudentThunk } from '../redux/thunks';

// The form used for BOTH adding and editing a student.
//  - Add mode:  <StudentForm />
//  - Edit mode: <StudentForm student={student} onSubmit={...} onCancel={...} />

const emptyForm = {
  name: '',
  rollNumber: '',
  phone: '',
  email: '',
  age: '',
  class: '',
  grade: '',
  image: '',
};

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
  { name: 'rollNumber', label: 'Roll Number', type: 'text', placeholder: 'e.g. 109' },
  { name: 'phone', label: 'Phone', type: 'text', placeholder: 'e.g. 9876543210' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
  { name: 'age', label: 'Age', type: 'number', placeholder: 'e.g. 15' },
  { name: 'class', label: 'Class', type: 'text', placeholder: 'e.g. 10-A' },
  { name: 'grade', label: 'Grade', type: 'text', placeholder: 'e.g. A' },
  { name: 'image', label: 'Image URL (optional)', type: 'text', placeholder: 'https://...' },
];

function StudentForm({ student, onSubmit, onCancel }) {
  const dispatch = useDispatch();
  const isEditMode = Boolean(student);

  // In edit mode, the form starts with the student's existing data.
  const [formData, setFormData] = useState(
    isEditMode
      ? {
          name: student.name,
          rollNumber: student.rollNumber,
          phone: student.phone,
          email: student.email,
          age: String(student.age),
          class: student.class,
          grade: student.grade,
          image: student.image || '',
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // Simple validation: returns an object with one message per invalid field.
  const validate = () => {
    const newErrors = {};
    const age = Number(formData.age);

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required.';

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required.';
    } else if (!/^[0-9+\-\s]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number (7-15 digits).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!String(formData.age).trim()) {
      newErrors.age = 'Age is required.';
    } else if (!Number.isInteger(age) || age < 3 || age > 100) {
      newErrors.age = 'Age must be a whole number between 3 and 100.';
    }

    if (!formData.class.trim()) newErrors.class = 'Class is required.';
    if (!formData.grade.trim()) newErrors.grade = 'Grade is required.';

    return newErrors;
  };

  // addStudent: sends the new student to JSON Server through Redux.
  const addStudent = async (studentData) => {
    try {
      await dispatch(addStudentThunk(studentData));
      setMessage({ type: 'success', text: 'Student added successfully.' });
      setFormData(emptyForm);
    } catch (error) {
      setMessage({ type: 'danger', text: `Could not add student. ${error.message}` });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Clean up the values before saving.
    const studentData = {
      name: formData.name.trim(),
      rollNumber: formData.rollNumber.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      class: formData.class.trim(),
      grade: formData.grade.trim(),
      image: formData.image.trim(),
    };

    setSaving(true);
    if (isEditMode) {
      await onSubmit(studentData); // StudentDetails.updateStudent
    } else {
      await addStudent(studentData);
    }
    setSaving(false);
  };

  const idPrefix = isEditMode ? `edit-${student.id}` : 'add';
  const columnClass = isEditMode ? 'col-12 col-sm-6 col-lg-3' : 'col-12 col-md-6';

  const form = (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        {fields.map((field) => (
          <div className={columnClass} key={field.name}>
            <label htmlFor={`${idPrefix}-${field.name}`} className="form-label">
              {field.label}
            </label>
            <input
              id={`${idPrefix}-${field.name}`}
              type={field.type}
              name={field.name}
              className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
          </div>
        ))}
      </div>

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Student'}
        </button>
        {isEditMode && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  // Edit mode: just the form (it is shown inside a student card).
  if (isEditMode) {
    return form;
  }

  // Add mode: a full page with a heading and a card.
  return (
    <div>
      <h3 className="page-title mb-4">Add Student</h3>
      <div className="card">
        <div className="card-body p-4">
          {message && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
              {message.type === 'success' && (
                <Link to="/students" className="alert-link ms-2">
                  View student list
                </Link>
              )}
            </div>
          )}
          {form}
        </div>
      </div>
    </div>
  );
}

export default StudentForm;

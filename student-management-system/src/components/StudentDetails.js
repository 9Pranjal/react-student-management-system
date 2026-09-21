import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StudentForm from './StudentForm';
import { updateStudentThunk, deleteStudentThunk } from '../redux/thunks';

// Shows ONE student as a card. The student comes in through the "student" prop.
// From this card the user can edit (updateStudent) or delete (deleteStudent).
function StudentDetails({ student }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  // updateStudent: called by StudentForm when the edit form is submitted.
  // The unique student.id decides which student is updated.
  const updateStudent = async (updatedData) => {
    try {
      await dispatch(updateStudentThunk(student.id, { ...updatedData, id: student.id }));
      setIsEditing(false);
      setImageFailed(false);
      setMessage({ type: 'success', text: 'Student updated successfully.' });
    } catch (error) {
      setMessage({ type: 'danger', text: `Could not update student. ${error.message}` });
    }
  };

  // deleteStudent: asks for confirmation, then deletes by the unique id.
  const deleteStudent = async () => {
    if (!window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      return;
    }
    try {
      await dispatch(deleteStudentThunk(student.id));
    } catch (error) {
      setMessage({ type: 'danger', text: `Could not delete student. ${error.message}` });
    }
  };

  const startEditing = () => {
    setMessage(null);
    setIsEditing(true);
  };

  const initial = student.name ? student.name.charAt(0).toUpperCase() : '?';
  const details = [
    { label: 'Phone', value: student.phone },
    { label: 'Email', value: student.email },
    { label: 'Age', value: student.age },
    { label: 'Class', value: student.class },
    { label: 'Grade', value: student.grade },
  ];

  return (
    <div className="card mb-3">
      <div className="card-body">
        {message && (
          <div className={`alert alert-${message.type} py-2`} role="alert">
            {message.text}
          </div>
        )}

        {isEditing ? (
          <>
            <h5 className="mb-3">Edit {student.name}</h5>
            <StudentForm
              student={student}
              onSubmit={updateStudent}
              onCancel={() => setIsEditing(false)}
            />
          </>
        ) : (
          <div className="row g-3 align-items-center">
            {/* Image (or the first letter of the name if there is no image) */}
            <div className="col-auto">
              {student.image && !imageFailed ? (
                <img
                  src={student.image}
                  alt={student.name}
                  className="avatar"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="avatar avatar-placeholder">{initial}</div>
              )}
            </div>

            {/* Student information */}
            <div className="col">
              <h5 className="mb-2">
                {student.name} <span className="badge badge-accent ms-1">Roll No. {student.rollNumber}</span>
              </h5>
              <div className="row row-cols-2 row-cols-md-3 g-2 small">
                {details.map((item) => (
                  <div className="col text-break" key={item.label}>
                    <span className="text-muted d-block">{item.label}</span>
                    {item.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="col-12 col-lg-auto d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={startEditing}>
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={deleteStudent}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;

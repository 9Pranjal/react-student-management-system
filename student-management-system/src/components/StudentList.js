import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentDetails from './StudentDetails';
import { fetchStudentsThunk } from '../redux/thunks';

// Compares two values so that "9-A" comes before "10-A" and "2" before "10".
const compareText = (a, b) =>
  String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });

function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  // Sorting and filtering choices
  const [sortField, setSortField] = useState('name'); // 'name' or 'rollNumber'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [classFilter, setClassFilter] = useState('All');

  // fetchStudents: loads the students from JSON Server through Redux.
  const fetchStudents = useCallback(() => {
    dispatch(fetchStudentsThunk());
  }, [dispatch]);

  // Load the students when the page opens.
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Class options for the filter (each class appears once).
  const classes = [...new Set(students.map((student) => student.class))].sort(compareText);

  // 1) filter by class, 2) sort by the selected field.
  const visibleStudents = students
    .filter((student) => classFilter === 'All' || student.class === classFilter)
    .sort((a, b) => {
      const result = compareText(a[sortField], b[sortField]);
      return sortOrder === 'asc' ? result : -result;
    });

  return (
    <div>
      <h3 className="page-title mb-4">Students</h3>

      {/* Sorting and filtering controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label htmlFor="sortField" className="form-label small text-muted mb-1">
                Sort by
              </label>
              <select
                id="sortField"
                className="form-select"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="name">Student Name</option>
                <option value="rollNumber">Roll Number</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="sortOrder" className="form-label small text-muted mb-1">
                Order
              </label>
              <select
                id="sortOrder"
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="classFilter" className="form-label small text-muted mb-1">
                Filter by class
              </label>
              <select
                id="classFilter"
                className="form-select"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="All">All classes</option>
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading message */}
      {loading && (
        <p className="text-center text-muted py-5">
          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          Loading students...
        </p>
      )}

      {/* Error message */}
      {!loading && error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>Could not load students. {error}</span>
          <button className="btn btn-sm btn-outline-danger" onClick={fetchStudents}>
            Try again
          </button>
        </div>
      )}

      {/* Student list */}
      {!loading && !error && (
        <>
          <p className="text-muted small">
            Showing {visibleStudents.length} of {students.length} students
          </p>

          {visibleStudents.length === 0 ? (
            <p className="text-center text-muted py-5">No students found.</p>
          ) : (
            visibleStudents.map((student) => <StudentDetails key={student.id} student={student} />)
          )}
        </>
      )}
    </div>
  );
}

export default StudentList;

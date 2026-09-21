// Action creators - plain functions that return action objects.
import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  DELETE_STUDENT_SUCCESS,
} from './actionTypes';

// Loading state
export const fetchStudentsRequest = () => ({ type: FETCH_STUDENTS_REQUEST });

// Fetching data
export const fetchStudentsSuccess = (students) => ({
  type: FETCH_STUDENTS_SUCCESS,
  payload: students,
});

// Error state
export const fetchStudentsFailure = (error) => ({
  type: FETCH_STUDENTS_FAILURE,
  payload: error,
});

// Add / Update / Delete
export const addStudentSuccess = (student) => ({
  type: ADD_STUDENT_SUCCESS,
  payload: student,
});

export const updateStudentSuccess = (student) => ({
  type: UPDATE_STUDENT_SUCCESS,
  payload: student,
});

export const deleteStudentSuccess = (id) => ({
  type: DELETE_STUDENT_SUCCESS,
  payload: id,
});

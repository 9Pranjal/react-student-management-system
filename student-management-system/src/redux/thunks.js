// Thunks handle asynchronous work (API calls) and then dispatch plain actions.
import * as studentApi from '../api/studentApi';
import {
  fetchStudentsRequest,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudentSuccess,
  updateStudentSuccess,
  deleteStudentSuccess,
} from './actions';

// Fetching: errors are saved in the store so StudentList can show them.
export const fetchStudentsThunk = () => async (dispatch) => {
  dispatch(fetchStudentsRequest());
  try {
    const students = await studentApi.getStudents();
    dispatch(fetchStudentsSuccess(students));
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message));
  }
};

// Add / Update / Delete: if the API fails, the error is thrown so the
// component that called the thunk can show its own error message.
export const addStudentThunk = (student) => async (dispatch) => {
  const newStudent = await studentApi.createStudent(student);
  dispatch(addStudentSuccess(newStudent));
};

export const updateStudentThunk = (id, student) => async (dispatch) => {
  const updatedStudent = await studentApi.updateStudent(id, student);
  dispatch(updateStudentSuccess(updatedStudent));
};

export const deleteStudentThunk = (id) => async (dispatch) => {
  await studentApi.deleteStudent(id);
  dispatch(deleteStudentSuccess(id));
};

// API service functions - all communication with JSON Server lives here.
const API_URL = 'http://localhost:3001/students';

// Small helper: sends the request and turns problems into readable errors.
const request = async (url, options) => {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error('Cannot reach the server. Make sure JSON Server is running on port 3001.');
  }

  if (!response.ok) {
    throw new Error(`Server error (status ${response.status}).`);
  }

  return response.json();
};

const jsonHeaders = { 'Content-Type': 'application/json' };

// GET /students
export const getStudents = () => request(API_URL);

// POST /students
export const createStudent = (student) =>
  request(API_URL, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(student),
  });

// PUT /students/:id
export const updateStudent = (id, student) =>
  request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(student),
  });

// DELETE /students/:id
export const deleteStudent = (id) =>
  request(`${API_URL}/${id}`, { method: 'DELETE' });

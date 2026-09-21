# Student Management System

A simple Student Management System built with **React 18**, **Redux (with Thunk)**, **React Router 6**, **Bootstrap 5** and **JSON Server** as the backend.

## Demo login

| Field    | Value              |
| -------- | ------------------ |
| Email    | `admin@school.com` |
| Password | `admin123`         |

> This is basic **frontend-only** authentication for learning. The credentials are stored in the code and the login status is kept in `localStorage`. It is **not** production-level security.

## Setup

You need **Node.js 18 or newer** (includes npm).

```bash
# 1. Go into the project folder
cd student-management-system

# 2. Install all dependencies
npm install
```

## Run the app

The app needs **two terminals** (one for the API, one for React).

**Terminal 1 – JSON Server (backend, port 3001)**

```bash
npm run server
```

**Terminal 2 – React (frontend, port 3000)**

```bash
npm start
```

Open http://localhost:3000 and sign in with the demo login above.

> JSON Server writes changes (add / edit / delete) straight into `db.json`. To reset the data, restore the original `db.json`.

## Folder structure

```
student-management-system/
├── db.json                     # JSON Server database (initial student data)
├── package.json                # dependencies + scripts
├── public/
│   └── index.html
└── src/
    ├── index.js                # entry point: Redux Provider + Bootstrap CSS
    ├── index.css               # small purple/blue accent theme
    ├── App.js                  # routes (public + private)
    ├── api/
    │   └── studentApi.js       # API service functions (GET / POST / PUT / DELETE)
    ├── redux/
    │   ├── actionTypes.js      # action type names
    │   ├── actions.js          # action creators
    │   ├── reducer.js          # how the store changes
    │   ├── thunks.js           # async operations (call the API, then dispatch)
    │   └── store.js            # Redux store + thunk middleware
    ├── components/
    │   ├── Navbar.js           # responsive navbar, active link, sign out
    │   ├── PrivateRoute.js     # blocks pages when not logged in
    │   ├── StudentList.js      # fetchStudents + sorting + filtering
    │   ├── StudentDetails.js   # one student card: updateStudent + deleteStudent
    │   └── StudentForm.js      # form for adding (addStudent) and editing
    ├── pages/
    │   ├── Login.js            # sign-in page
    │   └── Profile.js          # signed-in user's details
    └── utils/
        └── auth.js             # login / logout / isLoggedIn (localStorage)
```

## Pages

| URL             | Page                  | Access  |
| --------------- | --------------------- | ------- |
| `/login`        | Login                 | Public  |
| `/students`     | Student List          | Private |
| `/students/add` | Add Student           | Private |
| `/profile`      | User Profile          | Private |

Any other address redirects to `/students` (which sends logged-out users to `/login`). The Student List page acts as the dashboard, so there is no separate Dashboard page.

## How it works

**Redux data flow**

```
Component  ->  thunk  ->  API (JSON Server)  ->  action  ->  reducer  ->  store  ->  Component
```

1. A component dispatches a **thunk** (for example `fetchStudentsThunk()`).
2. The thunk calls a function in `api/studentApi.js`.
3. When the API answers, the thunk dispatches a plain **action** (for example `fetchStudentsSuccess(students)`).
4. The **reducer** updates the store, and the components using `useSelector` re-render.

Store shape: `{ students: [], loading: false, error: null }`

**Where each requirement lives**

| Requirement                          | Where                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------- |
| Fetch + show students, loading, error | `fetchStudents` in `StudentList.js`, `fetchStudentsThunk` in `thunks.js`   |
| Show one student's information       | `StudentDetails.js` (used by `StudentList` for every student)              |
| Add student + validation             | `addStudent` and `validate` in `StudentForm.js`                            |
| Update student                       | `updateStudent` in `StudentDetails.js` (opens `StudentForm` pre-filled)    |
| Delete student + confirmation        | `deleteStudent` in `StudentDetails.js` (uses `window.confirm`)             |
| Sorting (name / roll number, asc/desc) | `StudentList.js`                                                         |
| Filtering by class                   | `StudentList.js`                                                           |
| Login, sign out, protected pages     | `Login.js`, `Navbar.js`, `PrivateRoute.js`, `utils/auth.js`                |

**Form validation rules** (`StudentForm.js`)

- Name, roll number, class and grade are required.
- Phone is required and must be 7-15 characters (digits, `+`, `-` or spaces).
- Email is required and must look like a valid email address.
- Age is required and must be a whole number between 3 and 100.
- Image URL is optional. If it is empty or fails to load, the student's first letter is shown instead.

**API endpoints** (JSON Server, `http://localhost:3001`)

| Method   | URL              | Purpose         |
| -------- | ---------------- | --------------- |
| `GET`    | `/students`      | Get all students |
| `POST`   | `/students`      | Add a student   |
| `PUT`    | `/students/:id`  | Update a student |
| `DELETE` | `/students/:id`  | Delete a student |

## Troubleshooting

- **"Cannot reach the server" message** – JSON Server is not running. Start it with `npm run server`.
- **Port already in use** – close the other program using port 3000 or 3001. If you change the JSON Server port, also change `API_URL` in `src/api/studentApi.js`.

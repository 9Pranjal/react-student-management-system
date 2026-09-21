# Student Management System

## Project Setup

The project is developed using React.js with Create React App. Dependencies such as React Router DOM, Redux, React Redux, Redux Thunk, Bootstrap, and JSON Server are used.

## Component Structure

The application is organized into reusable components, including StudentList, StudentForm, StudentDetails, PrivateRoute, and Navbar.

## Redux Setup

Redux is used for centralized state management. Actions, reducers, and thunks handle student data, loading states, and errors.

## JSON Server Setup

JSON Server is used as a mock backend for storing student data. The `db.json` file contains student records, and the `/students` endpoint supports CRUD operations.

API Endpoint: http://localhost:3001/students

## Fetching and Displaying Student Data

Student records are fetched from JSON Server using Redux actions and thunks and displayed dynamically in the application.

## Adding New Students

The application allows users to add new students with details such as name, phone, email, age, class, grade, and image. The data is stored in JSON Server.

## Updating Student Details

Users can edit existing student records. Each student is identified using a unique ID to update the correct information.

## Deleting Students

The delete functionality allows users to remove student records from the application and update the stored data.

## Sorting and Filtering

The application provides sorting and filtering features to organize student records based on class, roll number, and other relevant criteria.

## User Authentication

A user authentication mechanism is implemented to allow users to sign in and access student management features.

## Navbar

The Navbar component provides navigation throughout the application, including student list, add student, user profile, and other available options.

## Bootstrap Styling

Bootstrap is used to create a clean, modern, and responsive user interface with styled forms, buttons, cards, and layouts.

## Screenshots

![Login Page](screenshots/login-page.png)

![User Profile](screenshots/user-profile.png)

![Add Student](screenshots/add-student.png)

![Add Student Successfully](screenshots/add-student-successfully.png)

![New Student Added](screenshots/new-student-added.png)

![Edit Student](screenshots/edit-student.png)

![Edit Successfully](screenshots/edit-successfull.png)

![Delete Student](screenshots/delete.png)

![Sort Class](screenshots/sort-class.png)

![Sort Roll Number](screenshots/sort-rollNo.png)

![Ascending Order](screenshots/ascending-order.png)

![Descending Order](screenshots/descending-order.png)

## Conclusion

The Student Management System demonstrates the use of React, Redux, and JSON Server to develop a functional student management application. It includes student CRUD operations, authentication, sorting, filtering, and responsive UI design.

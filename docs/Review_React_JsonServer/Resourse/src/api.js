const BASE_URL = 'http://localhost:3000';

export const getStudents = () =>
  fetch(`${BASE_URL}/students`).then(res => res.json());

export const getCourses = () =>
  fetch(`${BASE_URL}/courses`).then(res => res.json());

export const getEnrollments = () =>
  fetch(`${BASE_URL}/enrollments`).then(res => res.json());

export const addStudent = (student) =>
  fetch(`${BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

export const addCourse = (course) =>
  fetch(`${BASE_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });

export const addEnrollment = (data) =>
  fetch(`${BASE_URL}/enrollments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

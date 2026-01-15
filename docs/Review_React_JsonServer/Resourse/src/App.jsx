import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import {
  getStudents,
  getCourses,
  getEnrollments,
  addStudent,
  addCourse,
  addEnrollment
} from './api';

import StudentTable from './components/StudentTable';
import CourseTable from './components/CourseTable';
import EnrollmentTable from './components/EnrollmentTable';
import AddStudentForm from './components/AddStudentForm';
import AddCourseForm from './components/AddCourseForm';
import EnrollForm from './components/EnrollForm';

export default function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadData = async () => {
    setStudents(await getStudents());
    setCourses(await getCourses());
    setEnrollments(await getEnrollments());
  };

  useEffect(() => { loadData(); }, []);

  const studentEnrollments = enrollments.filter(
    e => e.studentId === selectedStudent?.id
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <StudentTable
            students={students}
            onSelect={setSelectedStudent}
            onDelete={async (id) => {
              const ens = enrollments.filter(e => e.studentId === id);
              for (let e of ens) {
                await fetch(`http://localhost:3000/enrollments/${e.id}`, { method: 'DELETE' });
              }
              await fetch(`http://localhost:3000/students/${id}`, { method: 'DELETE' });
              loadData();
            }}
          />
        </Col>

        <Col md={6}>
          <CourseTable
            courses={courses}
            onDelete={async (id) => {
              const ens = enrollments.filter(e => e.courseId === id);
              for (let e of ens) {
                await fetch(`http://localhost:3000/enrollments/${e.id}`, { method: 'DELETE' });
              }
              await fetch(`http://localhost:3000/courses/${id}`, { method: 'DELETE' });
              loadData();
            }}
          />
        </Col>
      </Row>

      {selectedStudent && (
        <EnrollmentTable
          enrollments={studentEnrollments}
          courses={courses}
        />
      )}

      <Row className="mt-4">
        <Col><AddStudentForm onAdd={async s => { await addStudent(s); loadData(); }} /></Col>
        <Col><AddCourseForm onAdd={async c => { await addCourse(c); loadData(); }} /></Col>
        <Col><EnrollForm students={students} courses={courses} onEnroll={async e => {
          await addEnrollment(e);
          loadData();
        }} /></Col>
      </Row>
    </Container>
  );
}

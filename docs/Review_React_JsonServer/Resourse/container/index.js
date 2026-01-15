import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Card, Modal, Alert } from 'react-bootstrap';
import { fetchData } from './fetchAPI';

export default function StudentManagement() {
  // 1. Khởi tạo State (Giả lập dữ liệu từ API)
  // start with empty arrays and try to load from json-server (http://localhost:3000)
  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  // Fetch data on mount; fall back to small hardcoded dataset if fetch fails
  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetchData('students').catch(() => null),
      fetchData('courses').catch(() => null),
      fetchData('enrollments').catch(() => null),
    ]).then(([s, c, e]) => {
      if (!mounted) return;
      if (s && s.length) setStudents(s);
      if (c && c.length) setCourses(c);
      if (e && e.length) setEnrollments(e);

      // If any endpoint was missing, keep a minimal fallback so UI still works
      if ((!s || s.length === 0) && students.length === 0) {
        setStudents([{ id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com' }, { id: 2, name: 'Trần Thị B', email: 'b@gmail.com' }]);
      }
      if ((!c || c.length === 0) && courses.length === 0) {
        setCourses([{ id: 101, title: 'React JS cơ bản', fee: '2.000.000đ' }, { id: 102, title: 'NodeJS nâng cao', fee: '3.500.000đ' }]);
      }
      if ((!e || e.length === 0) && enrollments.length === 0) {
        setEnrollments([{ id: 1001, studentId: 1, courseId: 101 }]);
      }
    }).catch(() => {
      // silent fallback
      if (mounted && students.length === 0) {
        setStudents([{ id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com' }, { id: 2, name: 'Trần Thị B', email: 'b@gmail.com' }]);
      }
    });

    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedStudent, setSelectedStudent] = useState(null);

  // --- LOGIC MỤC 2: JOIN DỮ LIỆU ---
  const studentCourses = useMemo(() => {
    if (!selectedStudent) return [];
    return enrollments
      .filter(e => e.studentId === selectedStudent.id)
      .map(e => courses.find(c => c.id === e.courseId))
      .filter(Boolean);
  }, [selectedStudent, enrollments, courses]);

  // --- LOGIC MỤC 3 & 4: THÊM MỚI ---
  const handleAddStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email')
    };
    setStudents([...students, newStudent]);
    e.target.reset();
  };

  // --- LOGIC MỤC 5: ĐĂNG KÝ ---
  const handleEnroll = (e) => {
    e.preventDefault();
    const sId = Number(e.target.studentId.value);
    const cId = Number(e.target.courseId.value);
    
    if (!enrollments.find(en => en.studentId === sId && en.courseId === cId)) {
      setEnrollments([...enrollments, { id: Date.now(), studentId: sId, courseId: cId }]);
    } else {
      alert("Học viên này đã đăng ký rồi!");
    }
  };

  // --- LOGIC MỤC 6: XÓA LIÊN ĐỚI ---
  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    setEnrollments(enrollments.filter(e => e.studentId !== id)); // Cascade delete
    if (selectedStudent?.id === id) setSelectedStudent(null);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    setEnrollments(enrollments.filter(e => e.courseId !== id)); // Cascade delete
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Hệ thống Quản lý Học tập</h2>

      <Row className="mb-5">
        {/* FORM THÊM HỌC VIÊN & KHÓA HỌC */}
        <Col md={6}>
          <Card className="p-3 shadow-sm h-100">
            <h5>3. & 4. Thêm Học viên / Khóa học</h5>
            <Form onSubmit={handleAddStudent} className="mb-3">
              <Row>
                <Col><Form.Control name="name" placeholder="Tên học viên" required /></Col>
                <Col><Form.Control name="email" type="email" placeholder="Email" required /></Col>
                <Col xs="auto"><Button type="submit" variant="primary">Thêm SV</Button></Col>
              </Row>
            </Form>
          </Card>
        </Col>

        {/* FORM ĐĂNG KÝ KHÓA HỌC (MỤC 5) */}
        <Col md={6}>
          <Card className="p-3 shadow-sm h-100">
            <h5>5. Đăng ký khóa học</h5>
            <Form onSubmit={handleEnroll}>
              <Row>
                <Col>
                  <Form.Select name="studentId">
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select name="courseId">
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </Form.Select>
                </Col>
                <Col xs="auto"><Button type="submit" variant="success">Đăng ký</Button></Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* DANH SÁCH HỌC VIÊN (MỤC 1 & 2) */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">1. Danh sách Học viên</Card.Header>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} onClick={() => setSelectedStudent(s)} style={{cursor: 'pointer'}}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>
                      <Button size="sm" variant="outline-danger" onClick={(e) => {e.stopPropagation(); deleteStudent(s.id)}}>Xóa</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* CHI TIẾT ĐĂNG KÝ (MỤC 2) */}
        <Col md={5}>
          <Card className="shadow-sm border-info">
            <Card.Header className="bg-info text-white">2. Khóa học đã đăng ký</Card.Header>
            <Card.Body>
              {selectedStudent ? (
                <>
                  <h6>Học viên: <strong>{selectedStudent.name}</strong></h6>
                  <hr />
                  {studentCourses.length > 0 ? (
                    <ul>{studentCourses.map(c => <li key={c.id}>{c.title}</li>)}</ul>
                  ) : <p className="text-muted">Chưa có đăng ký nào.</p>}
                </>
              ) : <Alert variant="warning">Chọn 1 học viên ở bảng trái để xem chi tiết</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
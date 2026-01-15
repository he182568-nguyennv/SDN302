import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function EnrollForm({ students, courses, onEnroll }) {
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');

    const submit = (e) => {
        e.preventDefault();
        onEnroll({
            studentId: Number(studentId),
            courseId: Number(courseId)
        });
    };

    return (
        <Form onSubmit={submit}>
            <h5>Đăng ký khóa học</h5>

            <Form.Select onChange={e => setStudentId(e.target.value)}>
                <option>Chọn học viên</option>
                {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </Form.Select>

            <Form.Select className="mt-2" onChange={e => setCourseId(e.target.value)}>
                <option>Chọn khóa học</option>
                {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                ))}
            </Form.Select>

            <Button className="mt-2" type="submit">Đăng ký</Button>
        </Form>
    );
}

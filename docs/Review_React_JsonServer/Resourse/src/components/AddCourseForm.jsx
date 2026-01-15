import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function AddCourseForm({ onAdd }) {
    const [title, setTitle] = useState('');

    const submit = (e) => {
        e.preventDefault();
        onAdd({ title });
        setTitle('');
    };

    return (
        <Form onSubmit={submit}>
            <h5>Thêm khóa học</h5>
            <Form.Control
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Tên khóa học"
            />
            <Button className="mt-2" type="submit">Thêm</Button>
        </Form>
    );
}

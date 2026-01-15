import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function AddStudentForm({ onAdd }) {
    const [name, setName] = useState('');

    const submit = (e) => {
        e.preventDefault();
        onAdd({ name });
        setName('');
    };

    return (
        <Form onSubmit={submit}>
            <h5>Thêm học viên</h5>
            <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Tên học viên"
            />
            <Button className="mt-2" type="submit">Thêm</Button>
        </Form>
    );
}

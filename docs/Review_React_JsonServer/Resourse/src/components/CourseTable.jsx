import { Table, Button } from 'react-bootstrap';

export default function CourseTable({ courses, onDelete }) {
    return (
        <>
            <h4>Danh sách khóa học</h4>
            <Table bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên khóa học</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(c.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

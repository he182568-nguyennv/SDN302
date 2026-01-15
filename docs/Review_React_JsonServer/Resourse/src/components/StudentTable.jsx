import { Table, Button } from 'react-bootstrap';

export default function StudentTable({ students, onSelect, onDelete }) {
    return (
        <>
            <h4>Danh sách học viên</h4>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id} onClick={() => onSelect(s)}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(s.id);
                                    }}
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

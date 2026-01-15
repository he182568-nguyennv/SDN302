import { Table } from 'react-bootstrap';

export default function EnrollmentTable({ enrollments, courses }) {
    return (
        <>
            <h5>Khóa học đã đăng ký</h5>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Tên khóa học</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(e => {
                        const course = courses.find(c => c.id === e.courseId);
                        return (
                            <tr key={e.id}>
                                <td>{course?.title}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

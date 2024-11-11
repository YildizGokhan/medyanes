import React, { useState, useEffect } from 'react';
import { getAPI, postAPI } from "../services/fetchAPI";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    IconButton,
    useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddStudentForm from './AddStudentForm';
import EditStudentDialog from './EditStudentDialog';
import { useTheme } from '@mui/material/styles';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchClasses = async () => {
        try {
            const data = await getAPI('/classes');
            setClasses(data || []);
        } catch (error) {
            console.error('Sınıflar alınamadı:', error);
        }
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const data = await getAPI('/students');
            const studentsWithClassInfo = data.map(student => {
                const studentClass = classes.find(cls => cls.id === student.classId);
                return {
                    ...student,
                    classInfo: studentClass ? `${studentClass.name} - ${studentClass.grade}/${studentClass.section}` : 'Bilinmiyor'
                };
            });
            setStudents(studentsWithClassInfo || []);
        } catch (error) {
            console.error('Öğrenciler alınamadı:', error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (classes.length > 0) {
            fetchStudents();
        }
    }, [classes]); 

    const addStudent = async (newStudent) => {
        try {
            await postAPI('/students', newStudent);
            fetchStudents();
        } catch (error) {
            console.error('Öğrenci eklenemedi:', error);
        }
    };

    const deleteStudent = async (studentId) => {
        const confirmDelete = window.confirm("Bu öğrenciyi silmek istediğinize emin misiniz?");
        if (!confirmDelete) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students?studentId=${studentId}`, {
                method: 'DELETE',
            });
            fetchStudents();
        } catch (error) {
            console.error("Öğrenci silinemedi:", error);
        }
    };

    const handleEditClick = (student) => {
        setEditingStudent(student);
        setEditDialogOpen(true);
    };

    const handleEditSave = async () => {
        if (!editingStudent) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students?studentId=${editingStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingStudent)
            });
            fetchStudents();
            setEditDialogOpen(false);
            setEditingStudent(null);
        } catch (error) {
            console.error("Öğrenci güncellenemedi:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                Öğrenci Listesi
            </Typography>

            {loading ? (
                <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
            ) : (
                <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['İsim', 'Soyisim', 'Email', 'Telefon', 'Şehir', 'İlçe', 'Okul Türü', 'Okul Adı', 'Sınıf No', 'Sınıf', 'İşlemler'].map((header) => (
                                    <TableCell key={header} style={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.name || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.surname || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.email || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.phone || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.city || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.town || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.schooltype || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.schollName || 'Bilinmiyor'}</TableCell> 
                                        <TableCell>{student.classNumber || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{student.classInfo || 'Bilinmiyor'}</TableCell> {/* classInfo kullanıldı */}
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEditClick(student)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => deleteStudent(student.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={11} align="center">
                                        Öğrenci bulunamadı.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', textAlign: 'center' }}>
                Yeni Öğrenci Ekle
            </Typography>
            <AddStudentForm classes={classes} addStudent={addStudent} />

            <EditStudentDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleEditSave}
                student={editingStudent}
                setStudent={setEditingStudent}
                classes={classes}
            />
        </Container>
    );
};

export default StudentList;

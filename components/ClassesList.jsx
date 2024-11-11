import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { getAPI, postAPI } from '../services/fetchAPI';
import DeleteIcon from '@mui/icons-material/Delete';

const ClassesList = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', grade: '', section: '', students: [] });

    useEffect(() => {
        fetchClasses();
    }, []);

    // Tüm sınıfları getirme işlemi
    const fetchClasses = async () => {
        try {
            const data = await getAPI('/classes');
            setClasses(data || []);
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    // Yeni sınıf ekleme işlemi
    const handleAddClass = async () => {
        try {
            await postAPI('/classes', {
                ...newClass,
                grade: parseInt(newClass.grade, 10), 
            });
            fetchClasses();
            setNewClass({ name: '', grade: '', section: '' });
        } catch (error) {
            console.error("Error adding class:", error);
        }
    };

    // Sınıf silme işlemi
    const handleDeleteClass = async (classId) => {
        const confirmDelete = window.confirm("Bu sınıfı silmek istediğinize emin misiniz?");
        if (!confirmDelete) return; 

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes?classId=${classId}`, {
                method: 'DELETE',
            });
            fetchClasses();
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    // Input değerlerini büyük harfe çeviren fonksiyon
    const handleInputChange = (e, field) => {
        setNewClass({
            ...newClass,
            [field]: e.target.value.toUpperCase(),
        });
    };

    return (
        <div>
            {/* Yeni sınıf ekleme alanı */}
            <Stack spacing={2} direction="row" style={{ marginBottom: '20px' }}>
                <TextField
                    label="Sınıf Adı"
                    value={newClass.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                />
                <TextField
                    label="Sınıf Seviyesi"
                    type="number"
                    value={newClass.grade}
                    onChange={(e) => handleInputChange(e, 'grade')}
                />
                <TextField
                    label="Bölüm"
                    value={newClass.section}
                    onChange={(e) => handleInputChange(e, 'section')}
                />
                <Button variant="contained" color="primary" onClick={handleAddClass}>
                    Sınıf Ekle
                </Button>
            </Stack>

            {/* Sınıfları listeleme alanı */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sınıf Adı</TableCell>
                            <TableCell>Seviye</TableCell>
                            <TableCell>Bölüm</TableCell>
                            <TableCell>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.map((classItem) => (
                            <TableRow key={classItem.id}>
                                <TableCell>{classItem.name}</TableCell>
                                <TableCell>{classItem.grade}</TableCell>
                                <TableCell>{classItem.section}</TableCell>
                                <TableCell>
                                    <IconButton color="secondary" onClick={() => handleDeleteClass(classItem.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ClassesList;

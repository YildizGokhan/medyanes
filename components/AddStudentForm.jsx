import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddStudentForm = ({ classes, addStudent }) => {
    const [newStudent, setNewStudent] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: 'student',
        verified: false,
        phone: '',
        city: '',
        town: '',
        schooltype: '',
        schollName: '', 
        classNumber: '',
        classId: ''
    });

    const handleInputChange = (field, value) => {
        setNewStudent(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        if (!newStudent.name || !newStudent.email || !newStudent.classId || !newStudent.schollName) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }
        addStudent(newStudent);
        setNewStudent({
            name: '',
            surname: '',
            email: '',
            password: '',
            role: 'student',
            verified: false,
            phone: '',
            city: '',
            town: '',
            schooltype: '',
            schollName: '', 
            classNumber: '',
            classId: ''
        });
    };

    return (
        <div>
            <TextField
                label="İsim"
                value={newStudent.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Soyisim"
                value={newStudent.surname}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                type="email"
                value={newStudent.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Telefon"
                value={newStudent.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Şehir"
                value={newStudent.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="İlçe"
                value={newStudent.town}
                onChange={(e) => handleInputChange('town', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Okul Türü"
                value={newStudent.schooltype}
                onChange={(e) => handleInputChange('schooltype', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Okul Adı"
                value={newStudent.schollName} 
                onChange={(e) => handleInputChange('schollName', e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Sınıf Numarası"
                value={newStudent.classNumber}
                onChange={(e) => handleInputChange('classNumber', e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Sınıf Seçin</InputLabel>
                <Select
                    value={newStudent.classId}
                    onChange={(e) => handleInputChange('classId', e.target.value)}
                >
                    {classes.map((classItem) => (
                        <MenuItem key={classItem.id} value={classItem.id}>
                            {classItem.name} - {classItem.grade}/{classItem.section}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Ekle
            </Button>
        </div>
    );
};

export default AddStudentForm;

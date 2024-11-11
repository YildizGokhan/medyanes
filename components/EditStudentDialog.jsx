import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const EditStudentDialog = ({ open, onClose, onSave, student, setStudent, classes }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Öğrenci Bilgilerini Düzenle</DialogTitle>
            <DialogContent>
                <TextField
                    label="İsim"
                    value={student?.name || ''}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Soyisim"
                    value={student?.surname || ''}
                    onChange={(e) => setStudent({ ...student, surname: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    type="email"
                    value={student?.email || ''}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Telefon"
                    value={student?.phone || ''}
                    onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Şehir"
                    value={student?.city || ''}
                    onChange={(e) => setStudent({ ...student, city: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="İlçe"
                    value={student?.town || ''}
                    onChange={(e) => setStudent({ ...student, town: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Okul Türü"
                    value={student?.schooltype || ''}
                    onChange={(e) => setStudent({ ...student, schooltype: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Okul Adı"
                    value={student?.schollName || ''} 
                    onChange={(e) => setStudent({ ...student, schollName: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Sınıf Numarası"
                    value={student?.classNumber || ''}
                    onChange={(e) => setStudent({ ...student, classNumber: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Sınıf Seçin</InputLabel>
                    <Select
                        value={student?.classId || ''}
                        onChange={(e) => setStudent({ ...student, classId: e.target.value })}
                    >
                        {classes.map((classItem) => (
                            <MenuItem key={classItem.id} value={classItem.id}>
                                {classItem.name} - {classItem.grade}/{classItem.section}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">İptal</Button>
                <Button onClick={onSave} color="primary">Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStudentDialog;

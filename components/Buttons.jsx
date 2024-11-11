import React, { useState } from 'react';
import { Button, Container, Stack, useMediaQuery } from '@mui/material';
import ClassesList from './ClassesList';
import StudentList from './StudentList';
import { useTheme } from '@mui/material/styles';

const Buttons = () => {
  const [activeComponent, setActiveComponent] = useState('students');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleShowClasses = () => {
    setActiveComponent('classes');
  };

  const handleShowStudents = () => {
    setActiveComponent('students');
  };

  return (
    <Container>
      <Stack
        direction={isSmallScreen ? 'column' : 'row'}
        spacing={isSmallScreen ? 1 : 2}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant={activeComponent === 'classes' ? 'contained' : 'outlined'}
          color={activeComponent === 'classes' ? 'error' : 'primary'}
          onClick={handleShowClasses}
          fullWidth={isSmallScreen}
        >
          Sınıf
        </Button>
        <Button
          variant={activeComponent === 'students' ? 'contained' : 'outlined'}
          color={activeComponent === 'students' ? 'error' : 'primary'}
          onClick={handleShowStudents}
          fullWidth={isSmallScreen}
        >
          Öğrenci
        </Button>
      </Stack>

      <div style={{ marginTop: '20px' }}>
        {activeComponent === 'classes' && <ClassesList />}
        {activeComponent === 'students' && <StudentList />}
      </div>
    </Container>
  );
};

export default Buttons;

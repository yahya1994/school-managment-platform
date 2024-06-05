import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ParentDashboard from './pages/student/ParentDashboard';

const App = () => {
  const { currentRole } = useSelector(state => state.user);
  const defaultTheme = createTheme();
  const customPrimaryColor = '#ff5722'; // Your desired primary color

  const theme = createTheme({

  });

  return (
    <>   <style jsx global>{`
    .MuiSvgIcon-root {
      color: ${currentRole === 'Teacher' ? "#ac4a76" : currentRole === 'Student' ? '#357b52' : '#173c60'} !important;
    }
    .fc .fc-button-primary {
      background-color:  ${currentRole === 'Teacher' ? "#ac4a76" : currentRole === 'Student' ? '#357b52' : '#173c60'} !important;;
      border-color:  ${currentRole === 'Teacher' ? "#ac4a76" : currentRole === 'Student' ? '#357b52' : '#173c60'} !important;
      color: var(--fc-button-text-color);
  }
  `}</style>
      <Router>
        {currentRole === null &&
          <Routes>

            <Route path="/" element={<Homepage />} />
            {/* <Route path="/" element={<AdminDashboard />} /> */}

            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/ParentLogin" element={<LoginPage role="Parent" />} />
            <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />

            <Route path='*' element={<Navigate to="/" />} />
          </Routes>}

        {currentRole === "Admin" &&
          <>
            <AdminDashboard />
          </>
        }

        {currentRole === "Student" &&
          <>
            <StudentDashboard />
          </>
        }
        {currentRole === "Parent" &&
          <>
            <ParentDashboard />
          </>
        }
        {currentRole === "Teacher" &&
          <>
            <TeacherDashboard />
          </>
        }
      </Router></>
  )
}

export default App
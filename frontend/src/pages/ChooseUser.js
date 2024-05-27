import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <div  onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>Admin</StyledTypography>
                <Typography>Connectez-vous en tant qu'administrateur pour accéder au tableau de bord et gérer les données de l'application.</Typography>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div  onClick={() => navigateHandler("Student")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>Student</StyledTypography>
                <Typography>Connectez-vous en tant qu'étudiant pour explorer les supports de cours et les devoirs.</Typography>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div onClick={() => navigateHandler("Teacher")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>Teacher</StyledTypography>
                <Typography>Connectez-vous en tant qu'enseignant pour créer des cours, des devoirs et suivre les progrès des étudiants.</Typography>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div onClick={() => navigateHandler("Parent")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>Parent</StyledTypography>
                <Typography>Connectez-vous en tant que parent pour consulter le progrès des élèves et communiquer avec les enseignants.</Typography>
              </StyledPaper>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(84deg, #173c60, #0f569a);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color:rgba(255, 255, 255, 0.6);
  cursor:pointer;
  min-height:180px;

  &:hover {
    background-color: white;
    color: #173c60;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;
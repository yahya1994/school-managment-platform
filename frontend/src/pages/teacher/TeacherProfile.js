import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser?.teachSclass
  const teachSubject = currentUser?.teachSubject
  const teachSchool = currentUser?.school

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Profile  </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Name: {currentUser?.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Email: {currentUser?.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Class: {teachSclass.sclassName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Subject: {teachSubject.subName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">School: {teachSchool.schoolName}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TeacherProfile

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;
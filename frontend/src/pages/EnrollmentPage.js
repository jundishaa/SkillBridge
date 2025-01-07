import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { Grid, Card, CardContent, Typography, Button, Container } from '@mui/material';

const EnrollmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await axios.get('/courses');
        const userEnrollments = await axios.get('/enroll');
        setCourses(allCourses.data);
        setEnrolledCourses(userEnrollments.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post('/enroll', { courseId });
      alert('Enrolled successfully!');
      const updatedEnrollments = await axios.get('/enroll');
      setEnrolledCourses(updatedEnrollments.data);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{course.title}</Typography>
                <Typography>{course.description}</Typography>
                {enrolledCourses.find((e) => e.courseId === course._id) ? (
                  <Button variant="outlined" color="secondary" disabled>
                    Enrolled
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEnroll(course._id)}
                  >
                    Enroll
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EnrollmentPage;


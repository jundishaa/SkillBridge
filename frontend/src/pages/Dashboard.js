import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses'); // Fetch all courses
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course._id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{course.title}</Typography>
              <Typography>{course.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                View Course
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;


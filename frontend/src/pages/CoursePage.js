import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/courses/${id}`); // Fetch specific course
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div>
      <h1>Course Details</h1>
      {course ? (
        <>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CoursePage;


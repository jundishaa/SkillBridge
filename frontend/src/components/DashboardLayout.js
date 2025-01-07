import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '20px' }}>
        <Outlet />
      </Container>
    </>
  );
};

export default DashboardLayout;


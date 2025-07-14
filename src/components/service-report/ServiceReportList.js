import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Typography, Box
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ServiceReportList = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/ServiceReport');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await api.delete(`/ServiceReport/${id}`);
        fetchReports();
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Service Reports</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/service-report/new')}
          sx={{
            bgcolor: '#800080',
            '&:hover': {
              bgcolor: '#4B0082'
            }
          }}
        >
          New Report
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Project No</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.customer?.name}</TableCell>
                <TableCell>{report.projectNo?.name}</TableCell>
                <TableCell>{report.system?.name}</TableCell>
                <TableCell>{report.location?.name}</TableCell>
                <TableCell>{report.formStatus?.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/service-report/edit/${report.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(report.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceReportList;
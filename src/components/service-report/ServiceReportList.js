import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Typography, Box, Chip, Tooltip, LinearProgress
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ServiceReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ServiceReport');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        borderBottom: '2px solid #800080',
        pb: 2
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#800080' }}>
          Service Reports
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/service-report/new')}
          sx={{
            bgcolor: '#800080',
            '&:hover': {
              bgcolor: '#4B0082'
            },
            borderRadius: '20px',
            px: 3
          }}
        >
          New Report
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{
        boxShadow: '0 4px 20px rgba(128, 0, 128, 0.15)',  // Enhanced shadow
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(128, 0, 128, 0.2)'  // Shadow animation on hover
        },
        transition: 'box-shadow 0.3s ease-in-out'
      }}>
        {loading && <LinearProgress sx={{ bgcolor: '#E6E6FA' }} />}
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F3E5F5' }}>
              <TableCell sx={{ 
                fontWeight: 'bold',
                fontSize: '1rem',  // Bigger font
                color: '#4B0082',  // Darker purple for better contrast
                padding: '16px'  // More padding
              }}>Job No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Project No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>System</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow 
                key={report.id}
                sx={{
                  '&:hover': {
                    bgcolor: '#FCF6FF',
                    transform: 'scale(1.002)',  // Subtle zoom effect
                    transition: 'transform 0.2s ease-in-out'
                  },
                  '& td': {
                    fontSize: '0.95rem',  // Bigger font for content
                    padding: '14px'  // More padding
                  }
                }}
              >
                <TableCell>{report.jobNumber}</TableCell>
                <TableCell>{report.customer}</TableCell>
                <TableCell>{report.projectNumberName}</TableCell>
                <TableCell>{report.systemName}</TableCell>
                <TableCell>{report.locationName}</TableCell>
                <TableCell>
                  <Chip
                    label={report.formStatus?.[0]?.name || 'N/A'}
                    size="small"
                    sx={{
                      bgcolor: '#E6E6FA',
                      color: '#4B0082'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Report">
                    <IconButton 
                      onClick={() => navigate(`/service-report/edit/${report.id}`)}
                      sx={{ color: '#800080' }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Report">
                    <IconButton 
                      onClick={() => handleDelete(report.id)}
                      sx={{ 
                        color: '#FF1493',
                        '&:hover': {
                          color: '#FF69B4'
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
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
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

const ServiceReportForm = () => {
  const [formData, setFormData] = useState({
    customer: '',
    contactNo: '',
    projectNo: '',
    system: '',
    location: '',
    followUpAction: '',
    failureDetectedTime: null,
    responseTime: null,
    arrivalTime: null,
    completionTime: null,
    typeOfService: '',
    issueReported: '',
    issueFound: '',
    actionTaken: '',
    furtherAction: '',
    formStatus: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };
  const selectOptions = ['Option 1', 'Option 2', 'Option 3', 'Other'];

  const labelWidth = 140;
  const fieldWidth = 220;
  const tableWidth = 1000;
  const containerWidth = 1300; // New constant for container width
  const columnWidth = tableWidth / 3;

  // Update common styles with theme colors
  const commonStyles = {
    fontSize: '14px',
    color: '#2c3e50'
  };

  const selectFieldStyles = {
    width: fieldWidth,
    backgroundColor: '#f8fafc',
    '& .MuiSelect-select': {
      width: '100%',
      display: 'block',
      height: '32px !important',
      padding: '4px 8px',
      ...commonStyles
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#94a3b8'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3b82f6'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2563eb'
    }
  };

  const textFieldStyles = {
    width: fieldWidth,
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-input': {
      height: '32px !important',
      padding: '4px 8px',
      ...commonStyles
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#94a3b8'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3b82f6'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2563eb'
    }
  };

  const selectProps = {
    displayEmpty: true,
    renderValue: (value) => value || 'Select an option',
    MenuProps: {
      PaperProps: {
        sx: {
          maxHeight: 300,
          '& .MuiMenuItem-root': {
            ...commonStyles,
            padding: '8px 16px'
          }
        }
      }
    }
  };

  // Update table row spacing
  const tableRowStyles = {
    height: '60px' // Consistent height for all rows
  };

  // Update section spacing
  const sectionSpacing = {
    mb: 4 // 32px margin bottom for sections
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ 
        p: 3, 
        maxWidth: containerWidth, // Updated to containerWidth
        mx: 'auto',
        backgroundColor: '#f8fafc'
      }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          backgroundColor: '#fff',
          width: '100%',
          boxShadow: '0 8px 32px rgba(128, 0, 128, 0.15)',
          '&:hover': {
            boxShadow: '0 12px 48px rgba(128, 0, 128, 0.2)'
          },
          transition: 'box-shadow 0.3s ease-in-out'
        }}>
          <Box sx={{ 
            position: 'relative',
            mb: 5 // Keep the same margin as before
          }}>
            <Typography 
              variant="h5" 
              align="center"
              sx={{ 
                fontSize: '24px', 
                fontWeight: 500,
                color: '#1976d2',
              }}
            >
              Service Report
            </Typography>
            <Box sx={{ 
              position: 'absolute',
              right: 0,
              top: 0,
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <Typography sx={{ mr: 2 }}>FormID:</Typography>
              <TextField
                value="SR001" // Replace with actual form ID
                size="small"
                InputProps={{
                  readOnly: true,
                  sx: {
                    bgcolor: '#f8fafc',
                    '& .MuiInputBase-input': {
                      color: '#64748b',
                      fontWeight: 500
                    }
                  }
                }}
                sx={{ width: '120px' }}
              />
            </Box>
          </Box>

          <Box sx={{ p: 3, backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #ccc' }}>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }} {...sectionSpacing}>
            <tbody>
              {/* First Row */}
              <tr style={tableRowStyles}>
                <td style={{ width: columnWidth, padding: '12px 0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Customer:</Typography>
                    <TextField
                      value={formData.customer}
                      onChange={handleChange('customer')}
                      size="small"
                      sx={textFieldStyles}
                    />
                  </Box>
                </td>
                <td style={{ width: columnWidth }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Contact No:</Typography>
                    <TextField
                      value={formData.contactNo}
                      onChange={handleChange('contactNo')}
                      size="small"
                      sx={{ width: fieldWidth }}
                    />
                  </Box>
                </td>
                <td style={{ width: columnWidth }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Project No:</Typography>
                    <TextField
                      select
                      value={formData.projectNo}
                      onChange={handleChange('projectNo')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={selectProps}
                    >
                      {selectOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
              </tr>

              {/* Second Row */}
              <tr style={tableRowStyles}>
                <td style={{ width: columnWidth }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>System:</Typography>
                    <TextField
                      select
                      value={formData.system}
                      onChange={handleChange('system')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={selectProps}
                    >
                      {selectOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
                <td style={{ width: columnWidth }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Location:</Typography>
                    <TextField
                      select
                      value={formData.location}
                      onChange={handleChange('location')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={selectProps}
                    >
                      {selectOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
                <td style={{ width: columnWidth }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: labelWidth, display: 'flex', alignItems: 'center' }}>
                      <Typography>Follow-up Action(Job No)</Typography>
                    </Box>
                    <TextField
                      select
                      value={formData.followUpAction}
                      onChange={handleChange('followUpAction')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={selectProps}
                    >
                      {selectOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
              </tr>
            </tbody>
          </table>
          </Box>
         
          {/* DATE / TIME SECTION */}
          <Box sx={{ 
            border: '2px solid #94a3b8', 
            borderRadius: '8px',
            p: 3,
            mt: 4,
            ...sectionSpacing,
            backgroundColor: '#fafafa',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '25%', padding: '12px', borderRight: '3px solid #000000' }}>
                    <Typography sx={{ ...commonStyles, mb: 1 }}>
                      Date / Time of Failure Detected
                      <br />
                      / Problem Reported
                    </Typography>
                    <DateTimePicker
                      value={formData.failureDetectedTime}
                      onChange={handleDateChange('failureDetectedTime')}
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          size="small" 
                          fullWidth 
                          sx={{
                            '& .MuiOutlinedInput-input': {
                              height: '32px !important',
                              padding: '4px 8px',
                              ...commonStyles
                            }
                          }}
                        />
                      }
                    />
                  </td>
                  <td style={{ width: '25%', padding: '12px', borderRight: '3px solid #000000' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Date / Time of Response
                    </Typography>
                    <DateTimePicker
                      value={formData.responseTime}
                      onChange={handleDateChange('responseTime')}
                      renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                    />
                  </td>
                  <td style={{ width: '25%', padding: '12px', borderRight: '3px solid #000000' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Date / Time of Arrival
                    </Typography>
                    <DateTimePicker
                      value={formData.arrivalTime}
                      onChange={handleDateChange('arrivalTime')}
                      renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                    />
                  </td>
                  <td style={{ width: '25%', padding: '12px' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Date / Time of Completion
                    </Typography>
                    <DateTimePicker
                      value={formData.completionTime}
                      onChange={handleDateChange('completionTime')}
                      renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>

          {/* TYPE OF SERVICE */}
          <Box sx={{ p: 3, backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #ccc' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} {...sectionSpacing}>
              <tbody>
                <tr>
                  <td style={{ width: columnWidth }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: labelWidth }}>Type of Service:</Typography>
                      <TextField
                        select
                        value={formData.typeOfService}
                        onChange={handleChange('typeOfService')}
                        size="small"
                        sx={selectFieldStyles}
                        SelectProps={selectProps}
                      >
                        {selectOptions.map((opt) => (
                          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          
          <Box sx={{ p: 3,mt:3, backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #ccc' }}>
          {/* Comments Section */}
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3,
              fontSize: '18px',
              fontWeight: 500,
              color: '#1976d2'
            }}
          >
            Comments / Description of Problem
          </Typography>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0 16px' }} {...sectionSpacing}>
              <tbody>
                <tr>
                  <td style={{ width: columnWidth, padding: '12px 0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: labelWidth }}>Issue Reported:</Typography>
                      <TextField
                        select
                        value={formData.issueReported}
                        onChange={handleChange('issueReported')}
                        size="small"
                        sx={selectFieldStyles}
                        SelectProps={selectProps}
                      >
                        {selectOptions.map((opt) => (
                          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        value={formData.issueReportedRemark}
                        size="small"
                        sx={{ ...textFieldStyles, marginLeft: '16px' }}
                      />
                    </Box>
                  </td>
                  </tr>
                  <tr>
                    <td style={{ width: columnWidth, padding: '12px 0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ width: labelWidth }}>Issue Found:</Typography>
                        <TextField
                          select
                          value={formData.issueFound}
                          onChange={handleChange('issueFound')}
                          size="small"
                          sx={selectFieldStyles}
                          SelectProps={selectProps}
                        >
                          {selectOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                          ))}
                        </TextField>
                        <TextField
                        value={formData.issueFoundRemark}
                        size="small"
                        sx={{ ...textFieldStyles, marginLeft: '16px' }}
                        />
                      </Box>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          
          <Box sx={{ p: 3,mt:3, backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #ccc' }}>
          {/* Action Taken Section */}
          
          <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0 16px' }} {...sectionSpacing}>
              <tbody>
                <tr>
                  <td style={{ width: columnWidth, padding: '12px 0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ width: labelWidth }}>Action Taken:</Typography>
                  <TextField
                    select
                    value={formData.actionTaken}
                    onChange={handleChange('actionTaken')}
                    size="small"
                    sx={selectFieldStyles}
                    SelectProps={selectProps}
                  >
                    {selectOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    value={formData.actionTakenRemark}
                    size="small"
                        sx={{ ...textFieldStyles, marginLeft: '16px' }}
                    />
                  </Box>
                </td>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box sx={{ p: 3,mt:3, backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #ccc' }}>
          {/* Further Action & Form Status */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }} {...sectionSpacing}>
            <tbody>
              <tr>
                <td style={{ width: '50%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Further Action To Be Taken:</Typography>
                    <TextField
                      select
                      value={formData.furtherAction}
                      onChange={handleChange('furtherAction')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={selectProps}
                    >
                      {selectOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
              </tr>
            </tbody>
          </table>
         </Box>
        
        <Box sx={{ p: 3,mt:3, backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #ccc' }}>
          {/* Further Action & Form Status */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }} {...sectionSpacing}>
            <tbody>
              <tr>
                <td style={{ width: '50%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Form Status:</Typography>
                    <TextField
                      select
                      value={formData.formStatus}
                      onChange={handleChange('formStatus')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={selectProps}
                    >
                      {selectOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
              </tr>
            </tbody>
          </table>
         </Box>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 5 }}>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              sx={{ 
                minWidth: '120px',
                height: '40px',
                fontWeight: 500,
                background: 'linear-gradient(135deg, #800080 0%, #4B0082 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4B0082 0%, #800080 100%)'
                },
                boxShadow: '0 4px 12px rgba(75, 0, 130, 0.2)',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              SUBMIT
            </Button>
            <Button 
              variant="contained" 
              onClick={() => window.history.back()}
              sx={{ 
                minWidth: '120px',
                height: '40px',
                fontWeight: 500,
                background: 'linear-gradient(135deg, #800080 0%, #4B0082 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4B0082 0%, #800080 100%)'
                },
                boxShadow: '0 4px 12px rgba(75, 0, 130, 0.2)',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              CANCEL
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default ServiceReportForm;


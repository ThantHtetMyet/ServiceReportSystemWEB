import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
import { useNavigate } from 'react-router-dom';
import CustomModal from '../common/CustomModal';
const API_BASE_URL = 'https://localhost:7263/api';

const ServiceReportForm = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customer: '',
    contactNo: '',
    projectNo: { id: '', displayValue: '' },
    system: { id: '', displayValue: '' },
    location: { id: '', displayValue: '' },
    followUpAction: { id: '', displayValue: '' },  
    serviceTypes: [{ id: '', displayValue: '' }], // Changed to array
    formStatusID: '',
    failureDetectedTime: null,
    responseTime: null,
    arrivalTime: null,
    completionTime: null,
    issueReported: { id: '', displayValue: '' },
    issueFound: { id: '', displayValue: '' },
    actionTaken: { id: '', displayValue: '' },
    furtherAction: { id: '', displayValue: '' },
    formStatus: { id: '', displayValue: '' },
    jobNumber: '',
    // Remark fields
    serviceTypeRemark: '',
    issueReportedRemark: '',
    issueFoundRemark: '',
    actionTakenRemark: '',
    furtherActionRemark: '',
    formStatusRemark: ''
  });

  const getSelectProps = (fieldName) => ({
    displayEmpty: true,
    renderValue: (selected) => {
      if (!selected) return 'Select an option';
      return formData[fieldName]?.displayValue || 'Select an option';
    },
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 300
        }
      }
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  const [dropdownData, setDropdownData] = useState({
    projectNos: [],
    systems: [],
    locations: [],
    followupActions: [],
    issueReports: [],
    issueFindings: [],
    actionsTaken: [],
    furtherActions: [],
    formStatuses: [],
    serviceTypes: [],
    issueFound: [],
    issueReport: [],
    actionTaken: [],
    furtherActionTaken: [],
    formStatus: []
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [projectNosRes, systemsRes, locationsRes, followupActionsRes, serviceTypesRes,
              issueReportRes, issueFoundRes, actionTakenRes, furtherActionRes, formStatusRes] = await Promise.all([
          fetch(`${API_BASE_URL}/ProjectNoWarehouse`),
          fetch(`${API_BASE_URL}/SystemWarehouse`),
          fetch(`${API_BASE_URL}/LocationWarehouse`),
          fetch(`${API_BASE_URL}/FollowupActionWarehouse`),
          fetch(`${API_BASE_URL}/ServiceTypeWarehouse`),
          fetch(`${API_BASE_URL}/IssueReportWarehouse`),
          fetch(`${API_BASE_URL}/IssueFoundWarehouse`),
          fetch(`${API_BASE_URL}/ActionTakenWarehouse`),
          fetch(`${API_BASE_URL}/FurtherActionTakenWarehouse`),
          fetch(`${API_BASE_URL}/FormStatusWarehouse`)
        ]);
        
        const responses = await Promise.all([
          projectNosRes.json(),
          systemsRes.json(),
          locationsRes.json(),
          followupActionsRes.json(),
          serviceTypesRes.json(),
          issueReportRes.json(),
          issueFoundRes.json(),
          actionTakenRes.json(),
          furtherActionRes.json(),
          formStatusRes.json()
        ]);

        const [projectNos, systems, locations, followupActions, serviceTypes,
              issueReports, issueFindings, actionsTaken, furtherActions, formStatuses] = responses.map(response => 
          Array.isArray(response) ? response : []
        );

        setDropdownData({
          projectNos,
          systems,
          locations,
          followupActions,
          serviceTypes,
          issueReports,
          issueFindings,
          actionsTaken,
          furtherActions,
          formStatuses
        });
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

        const fetchNextJobNumber = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ServiceReport/NextJobNumber`);
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, jobNumber: data.jobNumber }));
        }
      } catch (error) {
        console.error('Error fetching job number:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNextJobNumber();
    
    fetchDropdownData();
  }, []);

  const handleChange = (field) => (event) => {
      const selectedId = event.target.value;
      let displayValue = '';
      
      // Find the display value based on the field type
      switch(field) {
        case 'projectNo':
          displayValue = dropdownData.projectNos.find(item => item.id === selectedId)?.projectNumber || '';
          break;
        case 'system':
          displayValue = dropdownData.systems.find(item => item.id === selectedId)?.name || '';
          break;
        case 'location':
          displayValue = dropdownData.locations.find(item => item.id === selectedId)?.name || '';
          break;
        case 'followUpAction':
          displayValue = dropdownData.followupActions.find(item => item.id === selectedId)?.followupActionNo || '';
          break;
        case 'serviceTypes':
          displayValue = dropdownData.serviceTypes.find(item => item.id === selectedId)?.name || '';
          break;
        case 'issueReported':
          displayValue = dropdownData.issueReports.find(item => item.id === selectedId)?.name || '';
          break;
        case 'issueFound':
          displayValue = dropdownData.issueFindings.find(item => item.id === selectedId)?.name || '';
          break;
        case 'actionTaken':
          displayValue = dropdownData.actionsTaken.find(item => item.id === selectedId)?.name || '';
          break;
        case 'furtherAction':
          displayValue = dropdownData.furtherActions.find(item => item.id === selectedId)?.name || '';
          break;
        case 'formStatus':
          displayValue = dropdownData.formStatuses.find(item => item.id === selectedId)?.name || '';
          break;
        case 'serviceTypeRemark':
        case 'issueReportedRemark':
        case 'issueFoundRemark':
        case 'actionTakenRemark':
        case 'furtherActionRemark':
        case 'customer':
        case 'formStatusRemark':
          setFormData({
            ...formData,
            [field]: event.target.value
          });
          return;
        default:
          setFormData({ ...formData, [field]: event.target.value });
          return;
      }
      
      setFormData({
        ...formData,
        [field]: { id: selectedId, displayValue }
      });
  };

  const handleDateChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const requestData = {
            customer: formData.customer, 
            projectNoID: formData.projectNo.id, // Remove parseInt
            systemID: formData.system.id, // Remove parseInt
            locationID: formData.location.id, // Remove parseInt
            followupActionID: formData.followUpAction.id, // Remove parseInt
            failureDetectedDate: formData.failureDetectedTime?.toISOString(),
            responseDate: formData.responseTime?.toISOString(),
            arrivalDate: formData.arrivalTime?.toISOString(),
            completionDate: formData.completionTime?.toISOString(),
            serviceType: [{ // Changed to array with id and remark
                id: formData.serviceTypes.id || null,
                remark: formData.serviceTypeRemark
            }],
            formStatus: [{ // Changed to array with id and remark
                id: formData.formStatus.id || null,
                remark: formData.formStatusRemark
            }],
            issueReported: [{
                id: formData.issueReported.id || null, // Remove parseInt, handle null case
                remark: formData.issueReportedRemark
            }],
            issueFound: [{
                id: formData.issueFound.id || null, // Remove parseInt, handle null case
                remark: formData.issueFoundRemark
            }],
            actionTaken: [{
                id: formData.actionTaken.id || null, // Remove parseInt, handle null case
                remark: formData.actionTakenRemark
            }],
            furtherAction: [{
                id: formData.furtherAction.id || null, // Remove parseInt, handle null case
                remark: formData.furtherActionRemark
            }],
            createdBy: user.id // This should already be a GUID string
        };
  
      const response = await fetch(`${API_BASE_URL}/ServiceReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }
  
      const result = await response.json();
      setFormData(prev => ({ ...prev, jobNumber: result.jobNumber }));
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleModalClose = () => {
      setShowSuccessModal(false);
      navigate('/service-reports'); // Navigate to the list page
  };

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
      <CustomModal
        open={showSuccessModal}
        onClose={handleModalClose}
        title="Success"
        message="Service report created successfully!"
      />
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
                <Typography sx={{ mr: 2 }}>Job No:</Typography>
                <TextField
                  value={isLoading ? 'Loading...' : (formData.jobNumber || 'N/A')}
                  size="small"
                  InputProps={{
                    readOnly: true,
                    sx: {
                      bgcolor: '#f8fafc',
                      '& .MuiInputBase-input': {
                        color: isLoading ? '#94a3b8' : '#64748b',
                        fontWeight: 500,
                        fontStyle: isLoading ? 'italic' : 'normal'
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
                      value={formData.projectNo.id}
                      onChange={handleChange('projectNo')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={getSelectProps('projectNo')}
                    >
                      {dropdownData.projectNos.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.projectNumber}
                        </MenuItem>
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
                      value={formData.system.id}
                      onChange={handleChange('system')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={getSelectProps('system')}
                    >
                      {dropdownData.systems.map((system) => (
                        <MenuItem key={system.id} value={system.id}>
                          {system.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </td>
                <td style={{ width: columnWidth }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Location:</Typography>
                    
                    <TextField
                      select
                      name="location" 
                      value={formData.location.id}
                      onChange={handleChange('location')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={getSelectProps('location')}
                    >
                      {dropdownData.locations.map((location) => (
                        <MenuItem key={location.id} value={location.id}>
                          {location.name}
                        </MenuItem>
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
                      value={formData.followUpAction?.id || ''}
                      onChange={handleChange('followUpAction')}
                      size="small"
                      sx={selectFieldStyles}
                      SelectProps={getSelectProps('followUpAction')}
                    >
                      {dropdownData.followupActions?.map((action) => (
                        <MenuItem key={action.id} value={action.id}>
                          {action.followupActionNo}
                        </MenuItem>
                      )) || []}
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
                      value={formData.serviceTypes.id}
                      onChange={handleChange('serviceTypes')}
                      size="small"
                      sx={{
                        width: '400px',
                        '& .MuiSelect-select': {
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          minHeight: '30px'
                        },
                        '& .MuiMenuItem-root': {
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          minHeight: '48px',
                          padding: '8px 16px'
                        }
                      }}
                      SelectProps={getSelectProps('serviceTypes')}
                    >
                      {dropdownData.serviceTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextField>
                      <TextField
                        value={formData.serviceTypeRemark}
                        onChange={handleChange('serviceTypeRemark')}
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
                        value={formData.issueReported.id}
                        onChange={handleChange('issueReported')}
                        SelectProps={getSelectProps('issueReported')}
                        size="small"
                        sx={{
                          width: '400px',
                          '& .MuiSelect-select': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            minHeight: '30px'
                          },
                          '& .MuiMenuItem-root': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            minHeight: '48px',
                            padding: '8px 16px'
                          }
                        }}
                      >
                        {dropdownData.issueReports.map((issue) => (
                          <MenuItem key={issue.id} value={issue.id}>
                            {issue.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        value={formData.issueReportedRemark}
                        onChange={handleChange('issueReportedRemark')}
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
                          value={formData.issueFound.id}
                          onChange={handleChange('issueFound')}
                          size="small"
                          sx={{
                            width: '400px',
                            '& .MuiSelect-select': {
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              minHeight: '30px'
                            },
                            '& .MuiMenuItem-root': {
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              minHeight: '48px',
                              padding: '8px 16px'
                            }
                          }}
                          SelectProps={getSelectProps('issueFound')}
                        >
                        {dropdownData.issueFindings.map((issue) => (
                          <MenuItem key={issue.id} value={issue.id}>
                            {issue.name}
                          </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                          value={formData.issueFoundRemark}
                          onChange={handleChange('issueFoundRemark')}
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
                    value={formData.actionTaken.id}
                    onChange={handleChange('actionTaken')}
                    size="small"
                          sx={{
                            width: '400px',
                            '& .MuiSelect-select': {
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              minHeight: '30px'
                            },
                            '& .MuiMenuItem-root': {
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              minHeight: '48px',
                              padding: '8px 16px'
                            }
                          }}
                          SelectProps={getSelectProps('actionTaken')}
                      >
                      {dropdownData.actionsTaken.map((actiondata) => (
                          <MenuItem key={actiondata.id} value={actiondata.id}>
                            {actiondata.name}
                          </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    value={formData.actionTakenRemark}
                    onChange={handleChange('actionTakenRemark')}
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
                      value={formData.furtherAction.id}
                      onChange={handleChange('furtherAction')}
                      size="small"
                      sx={{
                        width: '400px',
                        '& .MuiSelect-select': {
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          minHeight: '30px'
                        },
                        '& .MuiMenuItem-root': {
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          minHeight: '48px',
                          padding: '8px 16px'
                        }
                      }}
                      SelectProps={getSelectProps('furtherAction')}
                      >
                      {dropdownData.furtherActions.map((responsedata) => (
                          <MenuItem key={responsedata.id} value={responsedata.id}>
                            {responsedata.name}
                          </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      value={formData.furtherActionRemark}
                      onChange={handleChange('furtherActionRemark')}
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
          {/* Form Status */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }} {...sectionSpacing}>
            <tbody>
              <tr>
                <td style={{ width: '50%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ width: labelWidth }}>Form Status:</Typography>
                    <TextField
                      select
                      value={formData.formStatus.id}
                      onChange={handleChange('formStatus')}
                      size="small"
                      sx={{
                        width: '400px',
                        '& .MuiSelect-select': {
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          minHeight: '40px',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center'
                        },
                        '& .MuiMenuItem-root': {
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          minHeight: '40px',
                          padding: '8px 12px',
                          '&:hover': {
                            backgroundColor: '#f0f0f0'
                          },
                          '&.Mui-selected': {
                            backgroundColor: '#e3f2fd',
                            '&:hover': {
                              backgroundColor: '#bbdefb'
                            }
                          }
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#bdbdbd'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#757575'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2'
                        }
                      }}
                      SelectProps={getSelectProps('formStatus')}
                    >
                      {dropdownData.formStatuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      value={formData.formStatusRemark}
                      onChange={handleChange('formStatusRemark')}
                      size="small"
                      sx={{ ...textFieldStyles, marginLeft: '16px' }}
                    />
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


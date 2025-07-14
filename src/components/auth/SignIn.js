import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login as loginAPI } from '../../services/authService';
import CustomModal from '../common/CustomModal';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginAPI(formData);
      console.log('Login response:', response.data); // Add this line
      login(response.data);
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid email or password');
      setOpenErrorModal(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            boxShadow: '0 8px 32px rgba(128, 0, 128, 0.15)',
            '&:hover': {
              boxShadow: '0 12px 48px rgba(128, 0, 128, 0.2)'
            },
            transition: 'box-shadow 0.3s ease-in-out'
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #800080 0%, #4B0082 100%)',
              padding: '16px 48px',
              borderRadius: '8px',
              marginBottom: 2,
              boxShadow: '0 4px 12px rgba(75, 0, 130, 0.2)'
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              sx={{
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              Service Report System
            </Typography>
          </Box>
          <Typography
            component="h2"
            variant="h5"
            sx={{ color: '#800080', marginBottom: 4 }}
          >
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(135deg, #800080 0%, #4B0082 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4B0082 0%, #800080 100%)'
                },
                py: 1.5,
                boxShadow: '0 4px 12px rgba(75, 0, 130, 0.2)',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: '#800080',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </Link>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: '#800080',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate('/signup')}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
      <CustomModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        title="Login Failed"
        message={errorMessage}
      />
    </Container>
  );
};

export default SignIn;
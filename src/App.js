import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ServiceReportList from './components/service-report/ServiceReportList';
import ServiceReportForm from './components/service-report/ServiceReportForm';
import NavBar from './components/NavBar';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <NavBar />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                      <Navigate to="/dashboard" replace />
                    </Box>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <NavBar />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                      <Dashboard />
                    </Box>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/service-reports"
                element={
                  <ProtectedRoute>
                    <NavBar />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                      <ServiceReportList />
                    </Box>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/service-report/new"
                element={
                  <ProtectedRoute>
                    <NavBar />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                      <ServiceReportForm />
                    </Box>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/service-report/edit/:id"
                element={
                  <ProtectedRoute>
                    <NavBar />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                      <ServiceReportForm />
                    </Box>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Router>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
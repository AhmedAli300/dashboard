import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login';
import AddEditSubscriptionPage from './pages/AddEditSubscriptionPage';
import Subscriptions from './pages/Subscriptions';
import ReceiptsPage from './pages/ReceiptsPage';
import TimePage from './pages/TimePage';
import CheckInPage from './pages/CheckInPage';
import InvitationsPage from './pages/InvitationsPage';
import LeadingClientsPage from './pages/LeadingClientsPage';
import EmployeeSalariesPage from './pages/EmployeeSalariesPage';
import ShiftSchedulePage from './pages/ShiftSchedulePage';
import SubscriptionReportPage from './pages/SubscriptionReportPage';
import TradeReportPage from './pages/TradeReportPage';
import ReceiptsReportPage from './pages/ReceiptsReportPage';
import CountPage from './pages/CountPage';
import CheckOutPage from './pages/CheckOutPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // if (!isAuthenticated) {
  //   return children;
  // }

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${50}px` }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

// Separate component for the main app content
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
           <Navigate to="/dashboard" replace /> 
        } />
        {/* <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/dashboard" />
        } /> */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />  
        <Route path="/subscriptions" element={
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        } />
        <Route path="/subscriptions/add" element={
          <ProtectedRoute>
            <AddEditSubscriptionPage />
          </ProtectedRoute>
        } />
        <Route path="/subscriptions/edit/:id" element={
          <ProtectedRoute>
            <AddEditSubscriptionPage />
          </ProtectedRoute>
        } />
        <Route path="/receipts" element={
          <ProtectedRoute>
            <ReceiptsPage />
          </ProtectedRoute>
        } />
        <Route path="/time" element={
          <ProtectedRoute>
            <TimePage />
          </ProtectedRoute>
        } />
        <Route path="/check-in" element={
          <ProtectedRoute>
            <CheckInPage />
          </ProtectedRoute>
        } />
        <Route path="/invitations" element={
          <ProtectedRoute>
            <InvitationsPage />
          </ProtectedRoute>
        } />
        <Route path="/leading-clients" element={
          <ProtectedRoute>
            <LeadingClientsPage />
          </ProtectedRoute>
        } />
        <Route path="/employee-salaries" element={
          <ProtectedRoute>
            <EmployeeSalariesPage />
          </ProtectedRoute>
        } />
        <Route path="/shift-schedule" element={
          <ProtectedRoute>
            <ShiftSchedulePage />
          </ProtectedRoute>
        } />
        <Route path="/subscription-report" element={
          <ProtectedRoute>
            <SubscriptionReportPage />
          </ProtectedRoute>
        } />
        <Route path="/trade-report" element={
          <ProtectedRoute>
            <TradeReportPage />
          </ProtectedRoute>
        } />
        <Route path="/receipts-report" element={
          <ProtectedRoute>
            <ReceiptsReportPage />
          </ProtectedRoute>
        } />
        <Route path="/count" element={
          <ProtectedRoute>
            <CountPage />
          </ProtectedRoute>
        } />
        <Route path="/check-out" element={
          <ProtectedRoute>
            <CheckOutPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  );
};

function App() {  
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
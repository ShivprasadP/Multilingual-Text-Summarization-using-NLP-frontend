import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Index from './Index.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PreviousSammry from './pages/PreviousSummary.jsx'
import History from './pages/History.jsx'
import Logout from './components/Logout.jsx'
import './index.css'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/previous-summary/:id" element={<PreviousSammry />} />
          <Route path="/history" element={<History />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  </StrictMode>
);
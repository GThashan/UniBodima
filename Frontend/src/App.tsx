import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { RequestsPage } from './pages/RequestsPage';
import { ProfilePage } from './pages/ProfilePage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="app-container position-relative">
      <Toaster position="top-right" containerStyle={{ zIndex: 100000 }} />
      <Navbar onLoginClick={() => setShowLogin(true)} user={user} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      </Routes>

      <Footer />

      {/* Auth Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}
    </div>
  );
}

export default App;

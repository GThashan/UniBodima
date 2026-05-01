import { useState } from 'react';
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

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app-container position-relative">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      
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
          onLoginSuccess={() => window.location.reload()}
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

import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Upload } from './pages/Upload/Upload';
import { History } from './pages/History/History';
import { Form } from './pages/Form/Form';

export function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <BrowserRouter>
      <div className={`App ${!isLogged ? 'login-bg' : ''}`}>
        {!isLogged ? (
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={() => setIsLogged(true)} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/History" element={<History />} />
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

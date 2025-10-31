import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import Upload from './Components/Upload';
import Form from './Components/Form';

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
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

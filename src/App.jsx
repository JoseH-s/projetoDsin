import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Upload } from './pages/Upload/Upload';
import { History } from './pages/History/History';
import { Form } from './pages/Form/Form';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { InfractionsProvider } from './contexts/InfractionsContext';

export function App() {
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem('isLogged') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLogged', isLogged);
  }, [isLogged]);

  return (
    <InfractionsProvider>
      <BrowserRouter>
        <div className={`App ${!isLogged ? 'login-bg' : ''}`}>
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={() => setIsLogged(true)} />} />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isLogged}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute isAuthenticated={isLogged}>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute isAuthenticated={isLogged}>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form"
              element={
                <ProtectedRoute isAuthenticated={isLogged}>
                  <Form />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={isLogged ? "/" : "/login"} replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </InfractionsProvider>
  );
}

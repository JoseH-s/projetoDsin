import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { History } from './pages/History/History';
import { Form } from './pages/Form/Form';
import { Details } from './pages/Details/Details';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { InfractionsProvider } from './contexts/InfractionsContext';

export function App() {
  const [isLogged, setIsLogged] = useState(false);
  
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
            <Route 
              path="/details"
              element={
                <ProtectedRoute isAuthenticated={isLogged}>
                  <Details />
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

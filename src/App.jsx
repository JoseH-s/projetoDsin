import './App.css';
import { useState } from 'react';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import Upload from './Components/Upload';
import Form from './Components/Form';

export function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [page, setPage] = useState('home');

  return (
    <div className={`App ${!isLogged ? 'login-bg' : ''}`}>
      {!isLogged ? (
        <Login onLoginSuccess={() => setIsLogged(true)} />
      ) : (
        page === 'home' ? (
          <Home onNavigate={(p) => setPage(p)} />
        ) : page === 'upload' ? (
          <Upload onBack={() => setPage('home')} onNavigate={(p) => setPage(p)} />
        ) : page === 'form' ? (
          <Form />
        ) : null
      )}
    </div>
  );
}

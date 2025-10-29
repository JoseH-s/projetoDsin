import './App.css';
import { useState } from 'react';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import Upload from './Components/Upload';
import Form from './Components/Form';

export function App() {
  // controla qual tela mostrar
  const [isLogged, setIsLogged] = useState(false);
  const [page, setPage] = useState('home'); // 'home' | 'upload'

  return (
    <div className={`App ${!isLogged ? 'login-bg' : ''}`}>
      {!isLogged ? (
        // Passa função para o Login avisar quando o login for feito
        <Login onLoginSuccess={() => setIsLogged(true)} />
      ) : (
        // quando logado, decide qual componente interno mostrar
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

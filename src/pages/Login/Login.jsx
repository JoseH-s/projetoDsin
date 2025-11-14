import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/dsin.svg';

export function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username && password) {
            onLoginSuccess();
            navigate('/');
        } else {
            alert("Preencha os campos corretamente!");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.logoWrap}>
                    <img src={logo} alt="DSIN" className={styles.logoImg} />
                </div>

                <div className={styles["input-field"]}>
                    <input
                        type="text"
                        placeholder="Número pessoal"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className={styles.icon} />
                </div>

                <div className={styles["input-field"]}>
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className={styles.icon} />
                </div>

                <div className={styles["recall-forget"]}>
                    <label>
                        <a href="#">Recuperar senha</a>
                    </label>
                </div>

                <button type="submit">Entrar</button>

                <div className={styles["signup-link"]}>
                    <p>
                        Não tem uma conta? <a href="#">Cadastrar</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

import styles from './Home.module.css';
import { FaCalendarDay, FaTimes, FaHourglassHalf, FaCheck } from "react-icons/fa";
import logo from '../assets/dsin.svg';

export function Home({ onNavigate }) {
    const historico = [
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Rejeitada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Pendente" },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="DSIN logo" />
            </div>

            <aside className={styles.sidebar} />

            <main className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.cardTop}>
                                <p>OCORRÊNCIAS DO DIA</p>
                                <FaCalendarDay />
                            </div>
                            <h2>28</h2>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardTop}>
                                <p>REJEITADAS</p>
                                <FaTimes />
                            </div>
                            <h2>2</h2>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardTop}>
                                <p>PENDENTES DE REVISÃO</p>
                                <FaHourglassHalf />
                            </div>
                            <h2>5</h2>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardTop}>
                                <p>APROVADAS</p>
                                <FaCheck />
                            </div>
                            <h2>21</h2>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.btnAmarelo} onClick={() => onNavigate?.('upload')}>ENVIAR NOVA OCORRÊNCIA</button>
                        <button className={styles.btnCinza}>Consultar ocorrências</button>
                    </div>

                </div>

                <div className={styles.historico}>
                    <h3>HISTÓRICO DE OCORRÊNCIAS</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>DIA</th>
                                <th>DESCRIÇÃO</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historico.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.dia}</td>
                                    <td>{item.descricao}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

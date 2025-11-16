import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { HistoryContainer } from '../../Components/InfractionsHistory/HistoryContainer/HistoryContainer';
import { Header } from '../../Components/layout/Header/Header';
import { useInfractions } from '../../contexts/InfractionsContext';
import styles from './History.module.css';

export function History() {
  const { infractions, loading } = useInfractions();

    if (loading) {
        return <p>Carregando histórico...</p>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <main className={styles.content}>
                <h3>HISTÓRICO DE OCORRÊNCIAS</h3>
                <HistoryContainer infractions={infractions} />
            </main>
        </div>
    )
}
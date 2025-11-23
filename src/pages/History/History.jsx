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
            <Header />
            <Sidebar />

            <main className={styles.content}>
                <h1 className={styles.title}>HISTÓRICO DE OCORRÊNCIAS</h1>
                <HistoryContainer infractions={infractions} />
            </main>
        </div>
    );
}
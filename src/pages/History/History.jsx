import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { HistoryContainer } from '../../Components/InfractionsHistory/HistoryContainer/HistoryContainer';
import { Header } from '../../Components/layout/Header/Header';
import styles from './History.module.css';

export function History() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header/>
            </div>
            <aside>
                <Sidebar />
            </aside>
            <main className={styles.content}>
                    <div>
                <h3>HISTORICO</h3>
            </div>
                <HistoryContainer />
            </main>
        </div>
    )
}
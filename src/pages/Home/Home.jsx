import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

import { StatsContainer } from '../../Components/Stats/StatsContainer/StatsContainer';
import { ActionButtons } from '../../Components/Actions/ActionButtons/ActionButtons';
import { InfractionsContainer } from '../../Components/Infractions/InfractionsContainer/InfractionsContainer';
import { Header } from '../../Components/layout/Header/Header';
import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header/>
            </div>
            <aside>
                < Sidebar />
            </aside>
            <main className={styles.content}>
                <div className={styles.left}>
                    <StatsContainer />
                    < ActionButtons 
                        onUpload={() => navigate('/upload')}
                        onHistory={() => navigate('/history')}
                    />
                </div>
                <div className={styles.right}>
                    < InfractionsContainer />
                </div>
            </main>
        </div>
    );
}

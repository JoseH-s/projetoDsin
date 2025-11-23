import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { StatsContainer } from '../../Components/Stats/StatsContainer/StatsContainer';
import { ActionButtons } from '../../Components/Actions/ActionButtons/ActionButtons';
import { InfractionsContainer } from '../../Components/Infractions/InfractionsContainer/InfractionsContainer';
import { Header } from '../../Components/layout/Header/Header';
import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { UploadModal } from '../../Components/UploadModal/UploadModal';
import { useInfractions } from '../../contexts/InfractionsContext';

export function Home() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { infractions, addInfraction } = useInfractions();
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUploadClick = () => {
        setIsModalOpen(true);
    };
    
    return (
        <div className={styles.container}>
            <Header />
            <Sidebar />

            <main className={styles.content}>
                <div className={styles.left}>
                    <StatsContainer />
                    <ActionButtons
                        onUpload={handleUploadClick}
                        onHistory={() => navigate('/history')}
                    />
                </div>
                
                <div className={styles.right}>
                    <InfractionsContainer infractions={infractions} />
                </div>
            </main>

            <UploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={addInfraction}
            />
        </div>
    );
}
import { DetailsContainer } from '../../Components/Details/DetailsContainer/DetailsContainer';
import { Header } from '../../Components/layout/Header/Header';
import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
 
export function Details() {
    const location = useLocation();
    const infraction = location.state?.infraction;

<<<<<<< HEAD
    const handleGoBack = () => {
            window.history.back();
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.titlePage}>
                    <h3>Detalhes da Infração</h3>

                    <button className={styles.backButton} onClick={handleGoBack}>
                        Voltar
                    </button>
                </div>
                <DetailsContainer infraction={infraction} />
            </div>
            
=======
    return (
        <div className={styles.container}>
            <Header />
            <DetailsContainer infraction={infraction} />
>>>>>>> 84af5589e0e85705fe9ff44796b15f22d996cce4
        </div>

    )
}
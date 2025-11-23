import { DetailsContainer } from '../../Components/Details/DetailsContainer/DetailsContainer';
import { Header } from '../../Components/layout/Header/Header';
import { useInfractionDetails } from '../../hooks/useInfractionDetails';
import styles from "./Details.module.css";
 
export function Details() {
    const { infraction } = useInfractionDetails();

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

                {infraction && (
                    <DetailsContainer infraction={infraction} />
                )}
            </div>
        </div>
    )
}
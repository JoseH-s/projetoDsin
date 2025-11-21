import { DetailsContainer } from '../../Components/Details/DetailsContainer/DetailsContainer';
import { Header } from '../../Components/layout/Header/Header';
import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
 
export function Details() {
    const location = useLocation();
    const infraction = location.state?.infraction;

    return (
        <div className={styles.container}>
            <Header />
            <DetailsContainer infraction={infraction} />
        </div>

    )
}
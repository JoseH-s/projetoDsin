import PropTypes from 'prop-types';
import  styles  from "./DetailsContainer.module.css";

export function DetailsContainer( { infraction }) { 

    const displayDate = new Date(infraction.dataHora).toLocaleDateString('pt-BR');
<<<<<<< HEAD

        

    const statusClass = infraction.status
        ? styles[infraction.status.toLowerCase()] || ""
        : styles["pendente"]
    return (
        <div className={styles.detailsContainer}>
            <table className={styles.detailTable}>
                <thead>
                    <tr>
                        <th className={styles.data}>DATA</th>
                        <th className={styles.descricao}>DESCRICAO</th>
                        <th className={styles.modelo}>MODELO VEICULO</th>
                        <th className={styles.cor}>COR</th>
                        <th className={styles.placa}>PLACA</th>
                        <th className={styles.infrator}>INFRATOR</th>
                        <th className={styles.cnh}>CNH</th>
                        <th className={styles.tipo}>TIPO</th>
                        <th className={styles.status}>STATUS</th>
=======
    return (
        <div className={styles.detailsContainer}>
            <h3>Detalhes da Infração</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>DESCRICAO</th>
                        <th>MODELO VEICULO</th>
                        <th>COR</th>
                        <th>PLACA</th>
                        <th>INFRATOR</th>
                        <th>CNH</th>
                        <th>TIPO</th>
                        <th>STATUS</th>
>>>>>>> 84af5589e0e85705fe9ff44796b15f22d996cce4
                    </tr>
                 
                </thead>
                <tbody>
                    <tr>
                        <td>{displayDate}</td>
                        <td>{infraction.descricao}</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
<<<<<<< HEAD
                        <td>
                            <span className={`${styles.statusLine} ${statusClass}`}>
                                {infraction.status ?? "pendente"}
                            </span>
                        </td>
                    </tr>
=======
                    </tr>
                
>>>>>>> 84af5589e0e85705fe9ff44796b15f22d996cce4
                </tbody>
            </table>
        </div>
    )
}

DetailsContainer.PropTypes = {
    infraction: PropTypes.object
};


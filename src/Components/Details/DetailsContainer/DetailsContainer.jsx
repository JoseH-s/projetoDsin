import PropTypes from 'prop-types';
import  styles  from "./DetailsContainer.module.css";

export function DetailsContainer( { infraction }) { 

    const displayDate = new Date(infraction.dataHora).toLocaleDateString('pt-BR');      

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
                        <td>
                            <span className={`${styles.statusLine} ${statusClass}`}>
                                {infraction.status ?? "pendente"}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

DetailsContainer.PropTypes = {
    infraction: PropTypes.object
};


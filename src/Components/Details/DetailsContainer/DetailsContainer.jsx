import PropTypes from 'prop-types';
import  styles  from "./DetailsContainer.module.css";
import { formatDisplayDate } from '../../../services/dateService';

export function DetailsContainer( { infraction }) { 

    const date = formatDisplayDate(infraction.dataHora);

    const statusClass = infraction.status
        ? styles[infraction.status.toLoweCase()] || ""
        : styles["pendente"]

    const fields = [
        { key: "descricao" },
        { key: "modelo" },
        { key: "cor" },
        { key: "placa" },
        { key: "infrator" },
        { key: "cnh" },
        { key: "tipo" }
    ]

    const fallback = "-";

    return (
        <div className={styles.detailsContainer}>
            <table className={styles.detailTable}>
                <thead>
                    <tr>
                        <th className={styles.date}>DATA</th>
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
                        <td>{date}</td>

                        {fields.map(field => (
                            <td key={field.key}>
                                {infraction[field.key] || fallback}
                            </td>  
                        ))}
                        <td>
                            <span className={`${styles.statusLine} ${statusClass}`}>
                                {infraction.status ?? "pendente"}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

DetailsContainer.PropTypes = {
    infraction: PropTypes.object
};


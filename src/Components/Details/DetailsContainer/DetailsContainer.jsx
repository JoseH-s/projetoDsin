import PropTypes from 'prop-types';
import styles from "./DetailsContainer.module.css";
import { formatDisplayDate } from '../../../services/dateService';
import { getViolationTypeName } from '../../../constants/violationTypes';

export function DetailsContainer({ infraction }) {

    const date = formatDisplayDate(infraction.dateTime);
    const violationType = getViolationTypeName(infraction.type);

    const statusClass = infraction.status
        ? styles[infraction.status.toLowerCase()] || ""
        : styles["pendente"];

    const fallback = "-";

    return (
        <div className={styles.detailsContainer}>
            <table className={styles.detailTable}>
                <thead>
                    <tr>
                        <th className={styles.date}>DATA</th>
                        <th className={styles.descricao}>DESCRIÇÃO</th>
                        <th className={styles.modelo}>MODELO</th>
                        <th className={styles.cor}>COR</th>
                        <th className={styles.local}>LOCAL</th>
                        <th className={styles.referencia}>REFERÊNCIA</th>
                        <th className={styles.cidade}>CIDADE</th>
                        <th className={styles.estado}>ESTADO</th>
                        <th className={styles.tipoViolacao}>TIPO</th>
                        <th className={styles.statusCol}>STATUS</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className={styles.date}>{date}</td>
                        <td className={styles.descricao}>{infraction.description || fallback}</td>
                        <td className={styles.modelo}>{infraction.model || fallback}</td>
                        <td className={styles.cor}>{infraction.color || fallback}</td>
                        <td className={styles.local}>{infraction.violationLocation || fallback}</td>
                        <td className={styles.referencia}>{infraction.reference || fallback}</td>
                        <td className={styles.cidade}>{infraction.city || fallback}</td>
                        <td className={styles.estado}>{infraction.state || fallback}</td>
                        <td className={styles.tipoViolacao}>{violationType}</td>
                        <td className={styles.statusCol}>
                            <span className={`${styles.statusLine} ${statusClass}`}>
                                {infraction.status ?? "Pendente"}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

DetailsContainer.propTypes = {
    infraction: PropTypes.object
};

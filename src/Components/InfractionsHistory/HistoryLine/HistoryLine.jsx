import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDisplayDate } from "../../../services/dateService";
import { getViolationTypeName } from '../../../constants/violationTypes';


export function HistoryLine({ data }) {
    const navigate = useNavigate();
    const date = formatDisplayDate(data.dateTime);
    const violationType = getViolationTypeName(data.type);

    const handleClick = () => {
        navigate('/details', {
            state: {
                infraction: data
            }
        });
    };

    const statusClass = data.status
        ? styles[data.status.toLowerCase()] || ""
        : styles["pendente"]

    return (
        <tr className={styles.row}>
            <td>{date}</td>
            <td>{data.description || 'Sem descrição'}</td>

            <td>
                <span className={`${styles.status} ${statusClass}`}>
                    {data.status ?? "Pendente"}
                </span>
            </td>

            <td >
                <button className={styles.detailsButton} onClick={handleClick}>
                    + DETALHES
                </button>
            </td>
        </tr>
    );
}

HistoryLine.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dateTime: PropTypes.string.isRequired,
        description: PropTypes.string,
        model: PropTypes.string.isRequired,
        brand: PropTypes.string,
        type: PropTypes.number.isRequired,
        status: PropTypes.string,
    }).isRequired
};
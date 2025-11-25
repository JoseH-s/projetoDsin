import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import styles from './InfractionLine.module.css';
import { formatDisplayDate } from "../../../services/dateService";
import { getViolationTypeName } from "../../../constants/violationTypes";

export function InfractionLine({ data }) {
    const navigate = useNavigate();
    const displayDate = formatDisplayDate(data.dateTime);
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
        <tr className={styles.row} onClick={handleClick}>
            <td>{displayDate}</td>
            <td>{data.description || 'Sem descrição'}</td>
            <td>
                <span className={`${styles.status} ${statusClass}`}>
                    {data.status ?? "Pendente"}
                </span>
            </td>
        </tr>
    );
}

InfractionLine.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dateTime: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        description: PropTypes.string,
        type: PropTypes.number.isRequired,
        status: PropTypes.string,
    }).isRequired
}
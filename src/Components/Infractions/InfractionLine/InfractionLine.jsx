import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import styles from './InfractionLine.module.css';
export function InfractionLine({ dataHora, data }) {
    const navigate = useNavigate();
    const displayDate = new Date(dataHora).toLocaleDateString('pt-BR')

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
            <td>{data.descricao}</td>
            <td>
                <span className={`${styles.status} ${statusClass}`}>
                    {data.status ?? "pendente"}
                </span>
            </td>
        </tr>
    );
}

InfractionLine.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dataHora: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired
}
import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDisplayDate } from "../../../services/dateService";


export function HistoryLine({ data }) {
    const navigate = useNavigate();
    const date = formatDisplayDate(data.dataHora);

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
            <td>{data.id}</td>
            <td>{date}</td>
            <td>{data.tipoMulta?.nome}</td>
            <td>{data.descricao}</td>

            <td>
                <span className={`${styles.status} ${statusClass}`}>
                    {data.status ?? "pendente"}
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
        dataHora: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        tipoMulta: PropTypes.shape({
            nome: PropTypes.string
        })
    }).isRequired
};
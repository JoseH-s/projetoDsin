import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';


export function HistoryLine({ id, dia, data, type, descricao, status }) {
    const displayDate = dia || data;
    return (
        <tr>
            <td>{id}</td>
            <td>{displayDate}</td>
            <td>{type}</td>
            <td>{descricao}</td>
            <td>
                <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                    {status}
                </span>
            </td>
            <td>
                <a href="#">+ detalhes</a>
            </td>
        </tr>
    );
}

HistoryLine.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dia: PropTypes.string,
    data: PropTypes.string,
    type: PropTypes.string,
    descricao: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
}
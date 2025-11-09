import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';


export function HistoryLine({ id, data, type, descricao, status}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{data}</td>
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
    id: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
}
import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';
import { useNavigate } from 'react-router-dom';


export function HistoryLine({ id, dia, data, type, descricao, status }) {
    const displayDate = dia || data;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/form', { state: { infraction: { id, dia, descricao, status, ...data } } });
    };

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
            <td onClick={handleClick}>
                <button>+ detalhes</button>
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
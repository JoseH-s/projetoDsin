import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';
import { useNavigate } from 'react-router-dom';


export function HistoryLine({ id, dataHora, type, descricao, status, data }) {
    const displayDate = new Date(dataHora).toLocaleDateString('pt-BR')
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/form', { state: { infraction: { id, dataHora, descricao, status, ...data } } });
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
            <td >
                <button onClick={handleClick}>+ detalhes</button>
            </td>
        </tr>
    );
}

HistoryLine.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dataHora: PropTypes.string.isRequired,
    type: PropTypes.string,
    descricao: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    data: PropTypes.string,
}
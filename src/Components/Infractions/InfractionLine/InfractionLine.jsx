import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import styles from './InfractionLine.module.css';


export function InfractionLine({ dia, descricao, status, id, data }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/form', { state: { infraction: { id, dia, descricao, status, ...data } } });
    };

    return (
        <tr className={styles.row} onClick={handleClick}>
            <td>{dia}</td>
            <td>{descricao}</td>
            <td>
                <div className={`${styles.statusIndicator} ${styles[status.toLowerCase()]}`}
                    title={status}>
                </div>
            </td>
        </tr>
    );
}

InfractionLine.propTypes = {
    dia: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.object,
}
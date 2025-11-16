import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import styles from './InfractionLine.module.css';


export function InfractionLine({ dia, descricao, status, id, data }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/form', { 
            state: { 
                infraction: { 
                    dbData: {id, dia, descricao, status, ...data } 
                } 
            } 
        });
    };

    const safeStatus = status ? status.toLowerCase() : "default";

    return (
        <tr className={styles.row} onClick={handleClick}>
            <td>{dia}</td>
            <td>{descricao}</td>
            <td>
                <div className={`${styles.statusIndicator} ${styles[safeStatus]}`}
                    title={status ?? "Sem status"}>
                </div>
            </td>
        </tr>
    );
}

InfractionLine.propTypes = {
    dia: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    status: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.object,
}
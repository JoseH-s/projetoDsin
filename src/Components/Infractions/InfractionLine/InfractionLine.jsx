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

    const statusClass = data.status
            ? styles[data.status.toLowerCase()] || ""
            : styles["pendente"]

    return (
        <tr className={styles.row} onClick={handleClick}>
            <td>{dia}</td>
            <td>{descricao}</td>
            <td>
                <span className={`${styles.status} ${statusClass}`}>
                    {data.status ?? "pendente"}
                </span>
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
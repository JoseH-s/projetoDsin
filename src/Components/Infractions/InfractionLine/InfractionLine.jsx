import PropTypes from "prop-types";
import styles from './InfractionLine.module.css';


export function InfractionLine({ dia, descricao, status}) {
    return (
        <tr>
            <td>{dia}</td>
            <td>{descricao}</td>
            <td>
                <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}

InfractionLine.propTypes = {
    dia: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
}
import PropTypes from "prop-types";
import styles from './HistoryLine.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDisplayDate } from "../../../services/dateService";
import { getViolationTypeName } from '../../../constants/violationTypes';
import { useInfractions } from '../../../contexts/InfractionsContext';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';


export function HistoryLine({ data }) {
    const navigate = useNavigate();
    const { deleteInfraction } = useInfractions();
    const date = formatDisplayDate(data.dateTime);
    const violationType = getViolationTypeName(data.type);

    const handleClick = () => {
        navigate('/details', {
            state: {
                infraction: data
            }
        });
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate('/form', {
            state: {
                infraction: data,
                isEdit: true
            }
        });
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm(`Deseja realmente deletar a ocorrência "${data.description || 'Sem descrição'}"?`)) {
            await deleteInfraction(data.id);
        }
    };

    const statusClass = data.status
        ? styles[data.status.toLowerCase()] || ""
        : styles["pendente"]

    return (
        <tr className={styles.row}>
            <td>{date}</td>
            <td>{data.description || 'Sem descrição'}</td>

            <td>
                <span className={`${styles.status} ${statusClass}`}>
                    {data.status ?? "Pendente"}
                </span>
            </td>

            <td>
                <div className={styles.actionButtons}>
                    <button className={styles.detailsButton} onClick={handleClick}>
                        + DETALHES
                    </button>
                    <button className={styles.editButton} onClick={handleEdit} title="Editar">
                        <FiEdit2 />
                    </button>
                    <button className={styles.deleteButton} onClick={handleDelete} title="Deletar">
                        <FiTrash2 />
                    </button>
                </div>
            </td>
        </tr>
    );
}

HistoryLine.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dateTime: PropTypes.string.isRequired,
        description: PropTypes.string,
        model: PropTypes.string.isRequired,
        brand: PropTypes.string,
        type: PropTypes.number.isRequired,
        status: PropTypes.string,
    }).isRequired
};
import PropTypes from 'prop-types';
import styles from './ActionButtons.module.css';

export function ActionButtons({ onUpload, onHistory}) {
    return (
        <div className={styles.buttons}>
            <button className={styles.btnAmarelo} onClick={onUpload}>
                ENVIAR NOVA OCORRÊNCIA
            </button>
            <button className={styles.btnCinza} onClick={onHistory}>
                Consultar ocorrências
            </button>
        </div>
    );
}

ActionButtons.propTypes = {
    onUpload: PropTypes.func.isRequired,
    onHistory: PropTypes.func.isRequired,
};
import PropTypes from 'prop-types';
import styles from './StatCard.module.css';

export function StatCard({ title, value, icon }) {
    const IconComponent = icon;
    return (
        <div className={styles.card}>
            <div className={styles.cardTop}>
                <p>{title}</p>
            </div>
            <div className={styles.cardBottom}>
                <h2>{value}</h2>
                <IconComponent size={24} aria-hidden="true" />
            </div>
        </div>
    )
}

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    icon: PropTypes.elementType.isRequired,
};

import styles from './Header.module.css';
import logo from '../../../assets/dsin.svg';

export function Header() {
    return (
        <div className={styles.headerContent}>
            <img src={logo} alt="DSIN logo" />
        </div>
    )
}

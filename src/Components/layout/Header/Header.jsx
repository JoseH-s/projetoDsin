import styles from './Header.module.css';
import logo from '../../../assets/dsin.svg';

export function Header() {
    return (
        <header className={styles.headerContent} role="banner">
            <img src={logo} alt="DSIN logo" />
        </header>
    );
}

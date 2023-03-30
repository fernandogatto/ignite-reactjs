import logo from '../../assets/logo.svg';

import styles from './styles.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt="Logo Ignite"
      />

      <strong>Ignite Feed</strong>
    </header>
  );
}

export default Header;

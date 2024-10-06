import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import home from '../../assets/icons/home.svg';
import account from '../../assets/icons/account.svg';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img className={styles.icon} src={home} alt="homepage" />
          </Link>
        </li>
        <li>
          <div className={styles.blog}>Blog</div>
        </li>
        <li>
          <Link to="/account">
            <img className={styles.icon} src={account} alt="account" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

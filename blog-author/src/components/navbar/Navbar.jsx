import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import dashboard from '../../assets/icons/dashboard.svg';
import plus from '../../assets/icons/plus.svg';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img className={styles.icon} src={dashboard} alt="dashboard" />
          </Link>
        </li>
        <li>
          <div className={styles.blog}>Blog - Author</div>
        </li>
        <li>
          <Link to="/new">
            <img className={styles.icon} src={plus} alt="new post" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

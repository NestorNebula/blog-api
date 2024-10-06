import styles from './Footer.module.css';
import ghIcon from '../../assets/icons/github.svg';

function Footer() {
  return (
    <footer>
      <div className={styles.credits}>
        <div>
          <a
            href="https://www.flaticon.com/free-icons/blogging"
            title="blogging icons"
          >
            Blogging icons created by Darius Dan - Flaticon
          </a>
        </div>
        <div>
          <a
            href="https://www.flaticon.com/free-icons/delete"
            title="delete icons"
          >
            Delete icons created by Karacis - Flaticon
          </a>
        </div>
      </div>
      <div className={styles.cr}>
        © Noa Houssier
        <a href="https://github.com/NestorNebula">
          <img className={styles.ghIcon} src={ghIcon} alt="Github account" />
        </a>
        2024
      </div>
    </footer>
  );
}

export default Footer;

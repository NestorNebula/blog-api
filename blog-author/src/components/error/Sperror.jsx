import { Link } from 'react-router-dom';
import styles from './Error.module.css';

function Sperror({ title, message, status }) {
  return (
    <section className={styles.error}>
      <div>{title}</div>
      <div>{message}</div>
      {status === 404 || title === 'Not Found' ? (
        <Link to="/">Homepage</Link>
      ) : null}
    </section>
  );
}

export default Sperror;

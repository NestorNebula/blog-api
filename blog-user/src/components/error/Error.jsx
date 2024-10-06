import { Link, useRouteError } from 'react-router-dom';
import styles from './Error.module.css';

function Error() {
  const error = useRouteError();
  console.error(error);
  if (error.status === 404)
    error.message = 'The resource you requested does not exist.';

  return (
    <section className={styles.error}>
      <div>The app encountered an error.</div>
      {error.message && <div>{error.message}</div>}
      {error.status === 404 ? <Link to="/">Homepage</Link> : null}
    </section>
  );
}

export default Error;

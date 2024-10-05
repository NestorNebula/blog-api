import { Link } from 'react-router-dom';

function Sperror({ title, message, status }) {
  return (
    <section>
      <div>{title}</div>
      <div>{message}</div>
      {status === 404 || title === 'Not Found' ? (
        <Link to="/">Homepage</Link>
      ) : null}
    </section>
  );
}

export default Sperror;

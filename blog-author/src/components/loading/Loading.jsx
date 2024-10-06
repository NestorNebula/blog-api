import styles from './Loading.module.css';

function Loading() {
  return (
    <section className={styles.loading}>
      <div>We are loading the data.</div>
      <div>Please wait...</div>
    </section>
  );
}

export default Loading;

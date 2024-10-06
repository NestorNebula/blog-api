import { useState } from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { verifyTitle } from '../../helpers/inputValidation';
import getFetchOptions from '../../helpers/fetchOptions';
import Input from '../input/Input';
const API_URL = import.meta.env.VITE_API_URL;
import styles from './NewPost.module.css';

function NewPost() {
  const { author } = useOutletContext();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const {
    value: title,
    updateValue: updateTitle,
    validation: titleValidation,
  } = useInput(verifyTitle);
  const [content, setContent] = useState('');
  const updateContent = (e) => {
    setContent(e.target.value);
  };
  const [published, setPublished] = useState(false);
  const updatePublished = () => {
    setPublished(!published);
  };

  const createPost = async () => {
    const values = [title, content];
    const isValid =
      titleValidation.isValid && values.every((value) => value.length);
    if (!isValid) return;
    const response = await fetch(
      `${API_URL}/posts`,
      getFetchOptions('post', JSON.stringify({ title, content, published }))
    );
    if (response.status >= 400) {
      setError('Error when creating Post.');
    } else {
      setError(false);
      setSubmit(true);
    }
  };
  return (
    <main>
      {submit && <Navigate to="/" />}
      <header className={styles.header}>
        <div>Create New Post</div>
        <div>as {author.username}</div>
      </header>
      {error && <div>{error}</div>}
      <section className={styles.section}>
        <form className={styles.newForm}>
          <Input
            name="title"
            value={title}
            update={updateTitle}
            validation={titleValidation}
          />
          <label htmlFor="content">Post Content</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={updateContent}
            rows={10}
          ></textarea>
          <input
            className={styles.published}
            id="published"
            name="published"
            type="checkbox"
            onClick={updatePublished}
          />
          <label htmlFor="published">Publish Post ?</label>
          <button
            className={styles.createBtn}
            type="button"
            onClick={createPost}
          >
            Create Post
          </button>
        </form>
      </section>
    </main>
  );
}

export default NewPost;

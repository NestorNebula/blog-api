import { useState } from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import getFetchOptions from '../../helpers/fetchOptions';
import Input from '../input/Input';
const API_URL = import.meta.env.VITE_API_URL;

function NewPost() {
  const { author } = useOutletContext();
  const [submit, setSubmit] = useState(false);

  return (
    <main>
      {submit && <Navigate to="/" />}
      <header>
        <div>Create New Post</div>
        <div>as {author.username}</div>
      </header>
      <section></section>
    </main>
  );
}

export default NewPost;

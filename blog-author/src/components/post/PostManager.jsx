import { useState } from 'react';
import { useOutletContext, useParams, Navigate } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import { useInput } from '../../hooks/useInput';
import { verifyTitle } from '../../helpers/inputValidation';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from './Post';
import Input from '../input/Input';
import Sperror from '../error/Sperror';
import Loading from '../loading/Loading';
const API_URL = import.meta.env.VITE_API_URL;

function PostManager() {
  const [update, setUpdate] = useState(false);
  const { author } = useOutletContext();
  const { postId } = useParams();
  const {
    data: post,
    error,
    loading,
  } = useData(`${API_URL}/posts/${postId}`, getFetchOptions('get', null), [
    update,
  ]);
  const [fError, setFError] = useState(null);

  const [edit, setEdit] = useState(false);
  const updateEdit = () => {
    setTitle(post.title);
    setContent(post.content);
    setEdit(!edit);
  };

  const {
    value: title,
    setValue: setTitle,
    updateValue: updateTitle,
    validation: titleValidation,
  } = useInput(verifyTitle);
  const [content, setContent] = useState('');
  const updateContent = (e) => {
    setContent(e.target.value);
  };
  const updatePost = async () => {
    const values = [title, content];
    const isValid =
      titleValidation.isValid && values.every((value) => value.length);
    if (!isValid) return;
    const result = await fetch(
      `${API_URL}/posts/${postId}`,
      getFetchOptions('put', JSON.stringify({ title, content }))
    );
    if (result.status >= 400) {
      setFError('Error when updating post.');
    } else {
      setFError(null);
      setEdit(false);
      setUpdate(!update);
    }
  };

  const updateStatus = async () => {
    const result = await fetch(
      `${API_URL}/posts/${postId}`,
      getFetchOptions('put', JSON.stringify({ published: !post.published }))
    );
    if (result.status >= 400) {
      setFError('Error when updating post status.');
    } else {
      setFError(false);
      setUpdate(!update);
    }
  };

  return (
    <>
      {fError && <div>{fError}</div>}
      {error ? (
        <Sperror title={error} message={'Error when loading post.'} />
      ) : loading ? (
        <Loading />
      ) : (
        <main>
          {author.id === post.userId || <Navigate to="/" />}
          <header>
            <div>Post Manager</div>
          </header>
          <section>
            {edit ? (
              <form>
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
                  rows={20}
                ></textarea>
                <button type="button" onClick={updatePost}>
                  Update Post
                </button>
              </form>
            ) : (
              <>
                <Post
                  post={post}
                  details={true}
                  update={update}
                  setUpdate={setUpdate}
                />
                <button onClick={updateEdit}>Edit post</button>
                {post.published ? (
                  <button onClick={updateStatus}>Unpublish</button>
                ) : (
                  <button onClick={updateStatus}>Publish</button>
                )}
              </>
            )}
          </section>
        </main>
      )}
    </>
  );
}

export default PostManager;

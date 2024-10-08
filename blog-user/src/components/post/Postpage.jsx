import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from './Post';
import Input from '../input/Input';
import Sperror from '../error/Sperror';
import Loading from '../loading/Loading';
import styles from './Postpage.module.css';

function Postpage() {
  const { user, API_URL } = useOutletContext();
  const { postId } = useParams();
  const [update, setUpdate] = useState(false);
  const {
    data: post,
    error,
    loading,
  } = useData(`${API_URL}/posts/${postId}`, getFetchOptions('get', null), [
    update,
  ]);
  const [comment, setComment] = useState('');
  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const [postError, setPostError] = useState(null);
  const postComment = async () => {
    if (!comment.length) return;
    const response = await fetch(
      `${API_URL}/posts/${postId}/comments`,
      getFetchOptions('post', JSON.stringify({ content: comment, postId }))
    );
    if (response.status >= 400) {
      setPostError('Error when posting comment.');
    } else {
      setPostError(null);
      setUpdate(!update);
      setComment('');
    }
  };

  return (
    <>
      {error ? (
        <Sperror title={error} message={'Error when loading post.'} />
      ) : loading ? (
        <Loading />
      ) : (
        <section className={styles.section}>
          <Post
            post={post}
            details={true}
            user={user}
            update={update}
            setUpdate={setUpdate}
            API_URL={API_URL}
          />
          {postError && <div>{postError}</div>}
          <div className={styles.commentInput}>
            <Input
              name="comment"
              value={comment}
              update={updateComment}
              validation={{ isValid: true }}
              label="Add a comment"
            />
            <button onClick={postComment}>
              Post Comment as {user.username}
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default Postpage;

import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from './Post';
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
        <div>Error when loading post.</div>
      ) : loading ? (
        <div>Loading post...</div>
      ) : (
        <main>
          <header>
            <div>Post Manager</div>
          </header>
          <section>
            <Post
              post={post}
              details={true}
              update={update}
              setUpdate={setUpdate}
            />
            {post.published ? (
              <button onClick={updateStatus}>Unpublish</button>
            ) : (
              <button onClick={updateStatus}>Publish</button>
            )}
          </section>
        </main>
      )}
    </>
  );
}

export default PostManager;

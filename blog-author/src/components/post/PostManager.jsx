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
  } = useData(
    `${API_URL}/posts/${postId}`,
    getFetchOptions('get', null),
    update
  );

  return (
    <>
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
          </section>
        </main>
      )}
    </>
  );
}

export default PostManager;

import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from './Post';

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

  return (
    <>
      {error ? (
        <div>Error when loading post.</div>
      ) : loading ? (
        <div>Loading post...</div>
      ) : (
        <>
          <Post post={post} details={true} />
          <button>Add Comment</button>
        </>
      )}
    </>
  );
}

export default Postpage;

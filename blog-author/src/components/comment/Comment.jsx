import { useState } from 'react';
import getFetchOptions from '../../helpers/fetchOptions';
const API_URL = import.meta.env.VITE_API_URL;

function Comment({ comment }) {
  const [deleteChoice, setDeleteChoice] = useState(false);
  const updateDeleteChoice = () => {
    setDeleteChoice(!deleteChoice);
  };

  const deleteComment = async () => {
    await fetch(
      `${API_URL}/comments/${comment.id}`,
      getFetchOptions('delete', null)
    );
    setDeleteChoice(false);
    setUpdate(!update);
  };

  return (
    <div>
      <div>{comment.user.username}</div>
      <div>{comment.content}</div>
      <div>{new Date(comment.creationDate).toLocaleString()}</div>
      <button onClick={updateDeleteChoice}>Delete</button>
      {deleteChoice && (
        <div>
          <div>
            Are you sure you want to delete this comment ? This cannot be
            undone.
          </div>
          <button onClick={deleteComment}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export default Comment;

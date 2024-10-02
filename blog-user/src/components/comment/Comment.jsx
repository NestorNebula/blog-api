import { useState } from 'react';
import getFetchOptions from '../../helpers/fetchOptions';

function Comment({ comment, user, update, setUpdate, API_URL }) {
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
      <div>{new Date(comment.creationDate).toLocaleDateString()}</div>
      {user && user.id === comment.userId && (
        <button onClick={updateDeleteChoice}>Delete</button>
      )}
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

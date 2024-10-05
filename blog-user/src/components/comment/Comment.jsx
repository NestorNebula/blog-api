import { useState } from 'react';
import getFetchOptions from '../../helpers/fetchOptions';
import { formatDistanceToNow } from 'date-fns';
import styles from './Comment.module.css';
import trash from '../../assets/icons/trash.png';

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
    <div className={styles.comment}>
      <div className={styles.commentUsername}>{comment.user.username}</div>
      <div className={styles.commentDate}>
        {formatDistanceToNow(comment.creationDate) + ' ago'}
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
      {user && user.id === comment.userId && (
        <button className={styles.commentDelete} onClick={updateDeleteChoice}>
          <img src={trash} alt="Delete" />
        </button>
      )}
      {deleteChoice && (
        <div className={styles.commentConfirm}>
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

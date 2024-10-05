import Comment from '../comment/Comment';
import { formatDistanceToNow } from 'date-fns';
import styles from './Post.module.css';

function Post({ post, details, user, update, setUpdate, API_URL }) {
  return (
    <div className={styles.post}>
      <div className={styles.postUsername}>{post.user.username}</div>
      <div className={styles.postDate}>
        {formatDistanceToNow(post.creationDate) + ' ago'}
      </div>
      <div className={styles.postTitle}>{post.title}</div>
      <div className={styles.postContent}>{post.content}</div>
      {details ? (
        <div className={styles.postComments}>
          <div className={styles.postCommentsTitle}>Comments</div>
          {post.Comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                update={update}
                setUpdate={setUpdate}
                API_URL={API_URL}
              />
            );
          })}
        </div>
      ) : details !== false ? (
        <div className={styles.postCommentsLength}>
          {post.Comments.length > 1
            ? `${post.Comments.length} comments`
            : `${post.Comments.length} comment`}
        </div>
      ) : null}
    </div>
  );
}

export default Post;

import Comment from '../comment/Comment';
import styles from './Post.module.css';

function Post({ post, details, update, setUpdate }) {
  return (
    <section className={styles.post}>
      <div className={styles.postUsername}>{post.user.username}</div>
      <div className={styles.postTitle}>{post.title}</div>
      <div className={styles.postDate}>
        {new Date(post.creationDate).toLocaleString()}
      </div>
      <div className={styles.postContent}>{post.content}</div>
      {post.published ? (
        <div className={styles.postPublished}>Published</div>
      ) : (
        <div className={styles.postPublished}>Unpublished</div>
      )}
      {details ? (
        <div className={styles.postComments}>
          <div className={styles.postCommentsTitle}></div>
          {post.Comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                update={update}
                setUpdate={setUpdate}
              />
            );
          })}
        </div>
      ) : details !== false ? (
        <div className={styles.postCommentLength}>
          {post.Comments.length > 1
            ? `${post.Comments.length} comments`
            : `${post.Comments.length} comment`}
        </div>
      ) : null}
    </section>
  );
}

export default Post;

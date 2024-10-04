import Comment from '../comment/Comment';

function Post({ post, details }) {
  return (
    <div>
      <div>{post.user.username}</div>
      <div>{post.title}</div>
      <div>{new Date(post.creationDate).toLocaleString()}</div>
      <div>{post.content}</div>
      {post.published ? <div>Published</div> : <div>Unpublished</div>}
      {details ? (
        <div>
          {post.Comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      ) : details !== false ? (
        <div>
          {post.Comments.length > 1
            ? `${post.Comments.length} comments`
            : `${post.Comments.length} comment`}
        </div>
      ) : null}
    </div>
  );
}

export default Post;

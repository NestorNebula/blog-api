function Post({ post, details }) {
  return (
    <div>
      <div>{post.user.username}</div>
      <div>{post.title}</div>
      <div>{new Date(post.creationDate).toLocaleDateString()}</div>
      <div>{post.content}</div>
      {details ? (
        <div>Comments</div>
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

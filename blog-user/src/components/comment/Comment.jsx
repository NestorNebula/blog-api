function Comment({ comment }) {
  return (
    <div>
      <div>{comment.user.username}</div>
      <div>{comment.content}</div>
      <div>{new Date(post.creationDate).toLocaleDateString()}</div>
    </div>
  );
}

export default Comment;

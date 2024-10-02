function Comment({ comment, user }) {
  return (
    <div>
      <div>{comment.user.username}</div>
      <div>{comment.content}</div>
      <div>{new Date(comment.creationDate).toLocaleDateString()}</div>
      {user && user.id === comment.userId && <button>Delete</button>}
    </div>
  );
}

export default Comment;

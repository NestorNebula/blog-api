import Comment from '../comment/Comment';

function Post({ post, details, user, update, setUpdate, API_URL }) {
  return (
    <div>
      <div>{post.user.username}</div>
      <div>{post.title}</div>
      <div>{new Date(post.creationDate).toLocaleDateString()}</div>
      <div>{post.content}</div>
      {details ? (
        <div>
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

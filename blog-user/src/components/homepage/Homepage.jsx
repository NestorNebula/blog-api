import { useOutletContext, Link } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';

function Homepage() {
  const { user, API_URL } = useOutletContext();
  const {
    data: posts,
    loading,
    error,
  } = useData(`${API_URL}/posts`, getFetchOptions('get', null));

  return (
    <>
      <header>
        <div>Homepage</div>
        <div>{`Hello, ${user.username}`}</div>
      </header>
      {error ? (
        <div>Error when loading data.</div>
      ) : loading ? (
        <div>Loading data...</div>
      ) : (
        <section>
          {posts.map((post) => {
            return (
              <div key={post.id}>
                <div>{post.user.username}</div>
                <div>{post.title}</div>
                <div>{new Date(post.creationDate).toLocaleDateString()}</div>
                <div>{post.content}</div>
                <Link
                  to={`/posts/${post.id}`}
                >{`${post.Comments.length} comments`}</Link>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Homepage;

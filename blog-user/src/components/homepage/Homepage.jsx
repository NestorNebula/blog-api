import { useOutletContext, Link } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from '../post/Post';

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
                <Post post={post} details={false} />
                <Link to={`/posts/${post.id}`}>
                  {post.Comments.length > 1
                    ? `${post.Comments.length} comments`
                    : `${post.Comments.length} comment`}
                </Link>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Homepage;

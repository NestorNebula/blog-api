import { useOutletContext, Link } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from '../post/Post';
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const { author } = useOutletContext();
  const {
    data: posts,
    error,
    loading,
  } = useData(
    `${API_URL}/users/${author.id}/posts`,
    getFetchOptions('get', null)
  );

  return (
    <>
      {error ? (
        <div>Error when loading posts.</div>
      ) : loading ? (
        <div>Loading posts...</div>
      ) : (
        <main>
          <header>
            <div>{`${author.username}'s Dashboard`}</div>
          </header>
          <section>
            <div>Posts</div>
            {posts.map((post) => {
              return (
                <div key={post.id}>
                  <Post post={post} details={false} />
                  <Link to={`posts/${post.id}`}>See details</Link>
                </div>
              );
            })}
          </section>
        </main>
      )}
    </>
  );
}

export default Dashboard;

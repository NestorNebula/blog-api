import { useOutletContext, Link } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import Post from '../post/Post';
import Sperror from '../error/Sperror';
import Loading from '../loading/Loading';
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

  const sortPosts = (posts) => {
    posts.sort((a, b) => {
      const aDate = new Date(a.creationDate);
      const bDate = new Date(b.creationDate);
      return bDate - aDate;
    });
    return <></>;
  };

  return (
    <>
      {error ? (
        <Sperror title={error} message={'Error when loading posts.'} />
      ) : loading ? (
        <Loading />
      ) : (
        <main>
          {sortPosts(posts)}
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

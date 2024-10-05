import { useOutletContext, Link } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import getFetchOptions from '../../helpers/fetchOptions';
import sortPosts from '../../helpers/sortPosts';
import Post from '../post/Post';
import Sperror from '../error/Sperror';
import Loading from '../loading/Loading';
import styles from './Homepage.module.css';

function Homepage() {
  const { user, API_URL } = useOutletContext();
  const {
    data: posts,
    loading,
    error,
  } = useData(`${API_URL}/posts`, getFetchOptions('get', null));

  return (
    <main>
      <header>
        <div className={styles.greeting}>{`Hello, ${user.username}`}</div>
        <div className={styles.headerText}>Latest posts</div>
      </header>
      {error ? (
        <Sperror title={error} message={'Error when loading posts.'} />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {sortPosts(posts)}
          <section className={styles.posts}>
            {posts.map((post) => {
              return (
                post.published && (
                  <div className={styles.post} key={post.id}>
                    <Post post={post} details={false} />
                    <Link
                      className={styles.postCommentsLength}
                      to={`/posts/${post.id}`}
                    >
                      {post.Comments.length > 1
                        ? `${post.Comments.length} comments`
                        : `${post.Comments.length} comment`}
                    </Link>
                  </div>
                )
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}

export default Homepage;

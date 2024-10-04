import './App.css';
import Navbar from './components/navbar/Navbar';
import { Link, useLoaderData, Outlet } from 'react-router-dom';
import sortPosts from './helpers/sortPosts';
const BLOG_URL = import.meta.env.VITE_BLOG_URL;

function App() {
  const { user: author } = useLoaderData();
  return (
    <>
      <Navbar></Navbar>
      {author.role === 'AUTHOR' ? (
        <Outlet context={{ author }} />
      ) : (
        <section>
          <div>This page is for the blog authors.</div>
          <div>
            Please go to the <Link to={`${BLOG_URL}`}>user website</Link> to
            browse through the Blog.
          </div>
        </section>
      )}
    </>
  );
}

export default App;

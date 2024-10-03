import './App.css';
import Navbar from './components/navbar/Navbar';
import { Link, useLoaderData, Outlet } from 'react-router-dom';
const BLOG_URL = import.meta.env.VITE_BLOG_URL;

function App() {
  const { user } = useLoaderData();
  return (
    <>
      <Navbar></Navbar>
      {user.role === 'AUTHOR' ? (
        <Outlet />
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

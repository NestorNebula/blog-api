import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Link, useLoaderData, Outlet } from 'react-router-dom';
const BLOG_URL = import.meta.env.VITE_BLOG_URL;

function App() {
  const { user: author } = useLoaderData();
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
const API_URL = import.meta.env.VITE_API_URL;

function Auth() {
  return (
    <>
      <Navbar />
      <div className="background"></div>
      <Outlet context={{ API_URL }} />
      <Footer />
    </>
  );
}

export default Auth;

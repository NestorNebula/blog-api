import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
const API_URL = import.meta.env.VITE_API_URL;

function Auth() {
  return (
    <>
      <Navbar />
      <Outlet context={{ API_URL }} />
    </>
  );
}

export default Auth;

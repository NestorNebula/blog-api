import './App.css';
import Navbar from './components/navbar/Navbar';
import { Outlet, useLoaderData } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { user } = useLoaderData();
  return (
    <>
      <Navbar />
      <Outlet context={{ user, API_URL }} />
    </>
  );
}

export default App;

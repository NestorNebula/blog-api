import './App.css';
import Navbar from './components/navbar/Navbar';
import { Outlet, useLoaderData } from 'react-router-dom';

function App() {
  const { user } = useLoaderData();
  return (
    <>
      <Navbar />
      <Outlet context={{ user }} />
    </>
  );
}

export default App;

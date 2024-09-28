import './App.css';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Outlet context={{ user }} />
    </>
  );
}

export default App;

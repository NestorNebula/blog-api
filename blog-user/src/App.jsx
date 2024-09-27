import './App.css';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [id, setId] = useState(null);
  return (
    <>
      <Navbar />
      <Outlet context={{ id, setId }} />
    </>
  );
}

export default App;

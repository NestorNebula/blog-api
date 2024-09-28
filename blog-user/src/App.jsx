import './App.css';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useUser = (userId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/users/${userId}`, { mode: 'cors' })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Error when fetching data.');
          }
          return response.json();
        })
        .then((response) => setData(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return { data, error, loading };
};

function App() {
  const [id, setId] = useState(null);
  const { data: user, error, loading } = useUser(id);
  return (
    <>
      <Navbar />
      <Outlet context={{ id, setId }} />
    </>
  );
}

export default App;

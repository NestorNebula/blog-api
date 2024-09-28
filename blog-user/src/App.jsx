import './App.css';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getFetchOptions from './helpers/fetchOptions';

const useUser = (userId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(
        `http://localhost:3000/users/${userId}`,
        getFetchOptions('get', null)
      )
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Error when fetching data.');
          }
          return response.json();
        })
        .then((response) => setData(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId]);

  return { data, error, loading };
};

function App() {
  const [id, setId] = useState(null);
  if (id) {
    if (!localStorage.getItem('id')) {
      localStorage.setItem('id', id);
    }
  } else {
    const localId = localStorage.getItem('id');
    if (localId) setId(localId);
  }
  const { data: user, error, loading } = useUser(id);

  return (
    <>
      <Navbar />
      {(loading && <div>Loading data...</div>) ||
        (error && <div>Error when fetching data.</div>) || (
          <Outlet context={{ setId, user }} />
        )}
    </>
  );
}

export default App;

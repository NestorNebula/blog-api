import { useState, useEffect } from 'react';

const useData = (url, options, update = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, options)
      .then((response) => {
        if (response.status >= 500) throw new Error('Server Error');
        if (response.status >= 400) throw new Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, update);

  return { data, error, loading };
};

export { useData };

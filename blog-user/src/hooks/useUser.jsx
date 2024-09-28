const useUser = (userId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`, getFetchOptions('get', null))
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Error when fetching data.');
        }
        return response.json();
      })
      .then((response) => setData(response))
      .catch((error) => setError(error));
  }, []);

  return { data, error };
};

export { useUser };

import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Homepage() {
  const { user, API_URL } = useOutletContext();

  return (
    <>
      <header>Homepage</header>
      <div>Hello, {user.username} </div>
    </>
  );
}

export default Homepage;

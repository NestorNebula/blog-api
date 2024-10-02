import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getFetchOptions from '../../helpers/fetchOptions';

function Account() {
  const { user, API_URL } = useOutletContext();

  return (
    <main>
      <section>
        <div>{user.username}</div>
        <div> {user.email} </div>
        <div> {user.role.toLowerCase()}</div>
      </section>
    </main>
  );
}

export default Account;

// pages/api/auth/error.tsx

import { NextPage } from 'next';

const ErrorPage: NextPage = () => {
  return (
    <div>
      <h1>Error</h1>
      <p>There was an error processing your request. Please try again later.</p>
    </div>
  );
};

export default ErrorPage;

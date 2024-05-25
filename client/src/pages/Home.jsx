import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <main>
      <Link to='/Staff'>Staff Page</Link><br />
      <Link to='/Manager'>Manager Page</Link><br />
      <Link to='/Admin'>Data Admin Page</Link><br />
      <Link to='/Equipment'>Equipment Admin Page</Link><br />
      <Link to='/Rooms'>All Rooms Page</Link>
    </main>
  );
};

export default Home;
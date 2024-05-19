import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { Link } from 'react-router-dom';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3 border-dotted border-1"
        >
          <h2 className="text-3xl">Welcome</h2>
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
      <Link to='/Admin'>Data Admin Page</Link><br />
      <Link to='/Equipment'>Equipment Admin Page</Link>
    </main>
  );
};

export default Home;
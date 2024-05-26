import { Link } from 'react-router-dom';


const Home = () => {

    return (
      <>
        <main style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Welcome to our Homepage</h1>
            <p>Discover amazing things with our awesome website!</p>
           
          </div>
        </main>
      </>
    );
};


  

export default Home;

// return (
//   <main>
//   <Link to='/Staff'>Staff Page</Link><br />
//   <Link to='/Manager'>Manager Page</Link><br />
 
//   <Link to='/Admin'>Data Admin Page</Link><br />
//   <Link to='/Equipment'>Equipment Admin Page</Link><br />
//   <Link to='/Rooms'>All Rooms Page</Link>
// </main>
// );
// };
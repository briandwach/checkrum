import { Link } from 'react-router-dom';


const Home = () => {

    return (
      <>
        <main style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="/images/hero-banner.jpg" alt="Hero Banner" style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'relative', width: '100%' }} />
            <p>Welcome to Checkrum. A business-level application that simplifies your planning and strategic needs for keeping your properties in safe and working order.</p>
            <p>Checkrum is a safe and secure application that focused on making work as easy and efficient as possible.</p>
          </div>
        </main>
      </>
    );
};


  

export default Home;

// return (
//   <main>
  // <Link to='/Staff'>Staff Page</Link><br />
  // <Link to='/Manager'>Manager Page</Link><br />
 
  // <Link to='/Admin'>Data Admin Page</Link><br />
  // <Link to='/Equipment'>Equipment Admin Page</Link><br />
  // <Link to='/Rooms'>All Rooms Page</Link>
// </main>
// );
// };
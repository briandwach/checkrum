import { Link } from 'react-router-dom';
import auth from '../utils/auth';


const Home = () => {

  const user = auth.loggedIn();

  let userRole;
  if(user === true) {
    userRole = auth.getProfile().authenticatedPerson.role;
    console.log(userRole);
  }


    return (
      <>
        <div className="hero min-h-screen" style={{backgroundImage: 'url(../images/herobanner.avif)'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">CheckRum</h1>
              <p className="mb-5">A business-level application that simplifies your planning and strategic needs for keeping your properties in safe and working order.</p>
              {user === null ? (
                <Link to="/login" className="btn btn-primary">Get Started</Link>
              ) : (
                <Link to={userRole === 'admin' ? '/manager' : userRole === 'staff' ? '/staff' : '/manager'} className="btn btn-primary">Get Started</Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
};



  

export default Home;
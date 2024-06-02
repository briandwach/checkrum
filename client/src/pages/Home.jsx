import { Link } from 'react-router-dom';
import auth from '../utils/auth';


const Home = () => {

//code to check if the user is logged in when going to home page to change where the get started button sends you. -dh
  const user = auth.loggedIn();
  let userRole;
  if(user === true) {
    userRole = auth.getProfile().authenticatedPerson.role;
  }


    return (
      // this is a daisyui hero component. Specifically for an image with text and button on top of it -dh
      <>
        <div className="hero min-h-screen" style={{backgroundImage: 'url(../images/herobanner.avif)'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Checkrūm</h1>
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
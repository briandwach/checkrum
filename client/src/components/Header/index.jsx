import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  useEffect(() => {
    const htmlTag = document.querySelector('html');
    htmlTag.dataset.theme = 'business';
  }, []);


  return (
    <header>
      <div className="drawer" style={{ zIndex: 1 }}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2">
              <Link to="/">Checkrum: Inspection Tracker</Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {Auth.loggedIn() ? (
                  <>
                    <button className="btn btn-sm btn-info m-2" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="btn btn-sm btn-info m-2" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="btn btn-sm btn-info m-2" to="/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <label className="flex cursor-pointer gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    <input type="checkbox" value="corporate" className="toggle theme-controller"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div> 

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {Auth.loggedIn() ? (
              <>
                <button className="btn btn-sm btn-info m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link className="btn btn-sm btn-info m-2" to="/login">
                    Logout
                  </Link>
                </li>
                <li>
                  <Link className="btn btn-sm btn-info m-2" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              <label className="flex cursor-pointer gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                <input type="checkbox" value="corporate" className="toggle theme-controller"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from '../../utils/auth';


const Header = () => {
  const htmlTag = document.querySelector('html');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    htmlTag.dataset.theme = storedTheme;
  } else {
    htmlTag.dataset.theme = 'business';
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  let userRole = '';

  //find user role or set to guest if not logged in -dh
  try {
    userRole = Auth.getProfile().authenticatedPerson.role;
  } catch {
    userRole = 'Guest';
  }

  const [themeState, setThemeState] = useState('');
  const [checkState, setCheckState] = useState(false);

  console.log(localStorage.getItem('theme'));

  useEffect(() => {
    if (storedTheme) {
        setThemeState(storedTheme);
    } else {
        setThemeState('business');
        setCheckState(false);
    }
}, []); // Run this effect only on initial mount

useEffect(() => {
    if (themeState === 'business') {
        setCheckState(false);
    } else {
        setCheckState(true);
    }

    htmlTag.dataset.theme = themeState;
}, [themeState]); // Run this effect whenever themeState changes


  const handleTheme = (isChecked) => {
    const newThemeState = isChecked ? 'corporate' : 'business';

    setCheckState(isChecked);
    setThemeState(newThemeState);

    localStorage.setItem('theme', newThemeState);


    htmlTag.dataset.theme = newThemeState;
  };

  return (
    //this is a daisy ui component that is a nav bar with buttons on larger resolutions and a drawer on smaller resolutions. -dh
    <><header>
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
              <ul className="menu menu-horizontal" style={{ alignItems: "center" }}>
                {userRole === 'manager' && (
                  <>
                    <li>
                      <Link className="btn btn-sm btn-primary m-2" to="/manager">Manager</Link>
                    </li>
                  </>
                )}
                {userRole === 'staff' && (
                  <li>
                    <Link className="btn btn-sm btn-primary m-2" to="/staff">Staff</Link>
                  </li>
                )}
                {userRole === 'admin' && (
                  <>
                    <li>
                      <Link className="btn btn-sm btn-primary m-2" to="/manager">Manager</Link>
                    </li>
                    <li>
                      <Link className="btn btn-sm btn-primary m-2" to="/staff">Staff</Link>
                    </li>
                  </>
                )}

                {Auth.loggedIn() ? (
                  <>
                    <button className="btn btn-sm btn-primary m-2" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="btn btn-sm btn-primary m-2" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="btn btn-sm btn-primary m-2" to="/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <label className="flex cursor-pointer gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    <input type="checkbox" checked={checkState} className="toggle theme-controller" onChange={(e) => handleTheme(e.target.checked)} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div><div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {userRole === 'manager' && (
              <>
                <li>
                  <Link className="btn btn-sm btn-primary m-2" to="/manager">Manager</Link>
                </li>
              </>
            )}
            {userRole === 'staff' && (
              <li>
                <Link className="btn btn-sm btn-primary m-2" to="/staff">Staff</Link>
              </li>
            )}
            {userRole === 'admin' && (
              <>
                <li>
                  <Link className="btn btn-sm btn-primary m-2" to="/manager">Manager</Link>
                </li>
                <li>
                  <Link className="btn btn-sm btn-primary m-2" to="/staff">Staff</Link>
                </li>
              </>
            )}
            {Auth.loggedIn() ? (
              <>
                <button className="btn btn-sm btn-primary m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link className="btn btn-sm btn-primary m-2" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="btn btn-sm btn-primary m-2" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              <label className="flex cursor-pointer gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                <input type="checkbox" checked={checkState} className="toggle theme-controller" onChange={(e) => handleTheme(e.target.checked)} />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
              </label>
            </li>
          </ul>
        </div>
      </div>
      {/* this is the side drawer content. -dh */}
    </div><div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
        {userRole === 'manager' && (
                    <>
                      <li>
                        <Link className="btn btn-sm btn-primary m-2" to="/manager">Manager</Link>
                      </li>
                    </>
                  )}
                {userRole === 'staff' && (
                  <li>
                    <Link className="btn btn-sm btn-primary m-2" to="/staff">Staff</Link>
                  </li>
                )}
                {userRole === 'admin' && (
                  <>
                  <li>
                    <Link className="btn btn-sm btn-primary m-2" to="/manager">Manager</Link>
                  </li>
                  <li>
                    <Link className="btn btn-sm btn-primary m-2" to="/staff">Staff</Link>
                  </li>
                </>
                )}
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-sm btn-primary m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link className="btn btn-sm btn-primary m-2" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="btn btn-sm btn-primary m-2" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
          <li>
            <label className="flex cursor-pointer gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <input type="checkbox" value="corporate" className="toggle theme-controller" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
            </label>
          </li>
        </ul>
          </div>
        </div>
        </header>
      </>
    </header>
    </>
  );
};


export default Header;

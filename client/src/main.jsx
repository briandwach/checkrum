import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Staff from './pages/Staff';
import Manager from './pages/Manager';
import Error from './pages/Error';
import Admin from './pages/Admin';
import Rooms from './pages/Rooms.jsx';
import Inspection from './pages/Inspection.jsx';
import Contact from './pages/Contact.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/staff',
        element: <Staff />
      }, {
        path: '/manager',
        element: <Manager />
      }, {
        path: '/admin',
        element: <Admin />
      }, {
        path: '/rooms',
        element: <Rooms />
      }, {
        path: '/inspection/:id',
        element: <Inspection />
      }, {
        path: '/contact',
        element: <Contact />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

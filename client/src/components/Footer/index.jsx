import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
        <div className="container text-center">
          <div>
            <Link to="/contact" className="text-white mr-2">
              <i className="fa-solid fa-envelope mr-2"></i>
            </Link>
            <a href="https://github.com/briandwach/checkrum" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github ml-2"></i>
            </a>
          </div>

          <h4 className="text-white text-lg mb-3">
            &copy; 2024
          </h4>
        </div>
      </footer>
  );
};

export default Footer;

//old footer stuff

// {location.pathname !== '/' && (
//   <button
//     className="btn btn-dark mb-3"
//     onClick={() => navigate(-1)}
//   >
//     &larr; Go Back
//   </button>
// )}
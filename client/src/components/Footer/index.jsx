import { Link } from 'react-router-dom';
import DbButtons from '../DbButtons';


//footer component that is displayed at the bottom of the page. Icon/link to the apps github repo and contact page -dh
const Footer = () => {
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

          <DbButtons />

          <h4 className="text-white text-lg mb-3">
            &copy; Checkrum 2024
          </h4>
        </div>
      </footer>
  );
};

export default Footer;

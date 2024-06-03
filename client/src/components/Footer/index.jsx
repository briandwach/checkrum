import { Link } from 'react-router-dom';

//footer component that is displayed at the bottom of the page. Icon/link to the apps github repo and contact page -dh
const Footer = () => {
  return (
    <footer className="flex bg-secondary p-4" style={{justifyContent:"center"}}>
        <div className="container text-center">
          <div className="mb-4">
            <Link to="/contact" className="text-white mr-2">
              <i className="fa-solid fa-envelope mr-2 fa-2xl"></i>
            </Link>
            <a href="https://github.com/briandwach/checkrum" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github ml-2 fa-2xl"></i>
            </a>
          </div>

          <h4 className="text-white text-lg mb-3">
            &copy; Checkrūm 2024
          </h4>
        </div>
      </footer>
  );
};

export default Footer;

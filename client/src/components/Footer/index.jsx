import { useLocation, useNavigate } from 'react-router-dom';

import SeedButton from '../SeedButton';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className="text-white text-lg mb-3">
        &copy; Copyright 2024
        </h4>
        <SeedButton />
      </div>
    </footer>
  );
};

export default Footer;
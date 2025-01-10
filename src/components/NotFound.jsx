import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NotFound({ message }) {
  return (
    <div className="notfound-container">
      <h2>404 - {message || 'Page Not Found'}</h2>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

NotFound.propTypes = {
  message: PropTypes.string
};

export default NotFound;

// import { Navigate, useLocation } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ children, authedUser }) => {
//   const location = useLocation();
  
//   if (!authedUser) {
//     return <Navigate to="/" state={{ from: location }} replace />;
   
//   }

//   return children;
// };

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
//   authedUser: PropTypes.string,
// };

// const mapStateToProps = ({ authedUser }) => ({
//   authedUser,
// });

// export default connect(mapStateToProps)(PrivateRoute);
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  if (!authedUser) {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

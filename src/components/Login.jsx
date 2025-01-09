import { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/shared';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
    
      const { users } = props;
      const user = users[formData.username];
      
      if (!user || user.password !== formData.password) {
        throw new Error('Invalid credentials');
      }

      await props.dispatch(handleLogin(user.id));
      navigate('/');
    } catch {
      setErrors({ submit: 'Invalid username or password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Please login to continue...</h3>
        <h1 className="login-title">Employee Polls</h1>

        <form onSubmit={handleSubmit} className="login">
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
              placeholder="Enter your username"
              autoComplete="username" />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              autoComplete="current-password" />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          {errors.submit && (
            <div className="error-message text-center">{errors.submit}</div>
          )}

          <button
            type="submit"
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="login-footer">
          <p>Available Users:</p>
          <ul className="users-list">
            <li>johndoe / pass123</li>
            <li>janedoe / pass456</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
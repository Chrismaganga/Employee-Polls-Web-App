import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogin } from '../actions/shared'
import PropTypes from 'prop-types'

const User = (props) => {
	const navigate = useNavigate()

	// eslint-disable-next-line react/prop-types
	const { avatarURL, name } = props

	const logout = () => {
		props.dispatch(handleLogin(null))
		navigate('/')
	}

	return (
		<div className="user">
			<img
				src={avatarURL}
				alt={`${name.toLowerCase()} avatar`}
				width="35"
				height="35"
			/>
			<button
				data-testid="test-logout"
				className="logout-button"
				onClick={logout}
			>
				Logout
			</button>
			<div className="user-name">{name}</div>
		</div>
	)
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  avatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const mapStateToProps = ({ authedUser, users }) => {
	const user = users[authedUser]
	const { avatarURL, name } = user
	return {
		avatarURL,
		name,
	}
}

export default connect(mapStateToProps)(User)

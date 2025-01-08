import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Navlinks from './Navlinks'
import User from './User'

const Navbar = (props) => {
	return (
		<div className="navbar">
			<Navlinks />
			{!props.loading && <User />}{' '}
		</div>
	)
}

Navbar.propTypes = {
	loading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ authedUser }) => ({
	loading: authedUser === null,
})

export default connect(mapStateToProps)(Navbar)

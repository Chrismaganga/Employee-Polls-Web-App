import { handleInitialData } from './actions/shared'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import LandingPage from './components/LandingPage'
import NewPoll from './components/NewPoll'
import Leaderboard from './components/Leaderboard'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import './index.css'
import PollList from './components/PollList'
import Navbar from './components/Navbar'

const App = ({ loading, dispatch }) => {
	useEffect(() => {
		dispatch(handleInitialData())
	}, [dispatch])

	return (
		<>
			<LoadingBar />
			<div className="app-container">
				{loading === true ? (
					<Login />
				) : (
					<>
						<Navbar />
						<Routes>
							
							<Route path="/" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
							<Route path="/questions/:question_id" element={<PrivateRoute ><PollList /></PrivateRoute >} />
							<Route path="/add" element={<PrivateRoute ><NewPoll /></PrivateRoute >} />
							<Route path="/leaderboard" element={<PrivateRoute ><Leaderboard /></PrivateRoute>} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</>
				)}
				<Footer />
			</div>
		</>
	)
}

App.propTypes = {
	loading: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authedUser }) => ({
	loading: authedUser === null,
})

export default connect(mapStateToProps)(App)
import { handleInitialData } from './actions/shared'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { LoadingBar } from 'react-redux-loading-bar'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import PollPage from './components/PollPage'
import NewPoll from './components/NewPoll'
import Leaderboard from './components/Leaderboard'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import './index.css'

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
							<Route path="*" element={<NotFound page="page" />} />
							<Route path="/" element={<LandingPage />} />
							<Route path="/questions/:question_id" element={<PollPage />} />
							<Route path="/add" element={<NewPoll />} />
							<Route path="/leaderboard" element={<Leaderboard />} />
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
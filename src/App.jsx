import { handleInitialData } from './actions/shared'
import { Fragment, useEffect } from 'react'
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
import './styles/app.css'

const App = ({ loading, dispatch }) => {
	useEffect(() => {
		dispatch(handleInitialData())
	}, [dispatch])

	return (
		<Fragment>
			<LoadingBar />
			<div className="app-container">
				<Navbar />
				{loading === true ? (
					<Login />
				) : (
					<Routes>
						<Route path="*" element={<NotFound page="page" />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="/questions/:question_id" element={<PollPage />} />
						<Route path="/add" element={<NewPoll />} />
						<Route path="/leaderboard" element={<Leaderboard />} />
					</Routes>
				)}
				<Footer />
			</div>
		</Fragment>
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
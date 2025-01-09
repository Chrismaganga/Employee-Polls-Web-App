import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AnsweredPoll from './AnsweredPoll'
import UnansweredPoll from './UnansweredPoll'


const Poll = (props) => {
    const { poll, authedUser } = props
    
    if (!poll) {
        return <div>Loading...</div>;
    }

    const { optionOne, optionTwo } = poll
    
    if (!optionOne || !optionTwo) {
        return <div>Error: Invalid poll data</div>;
    }

    const userChoseOptionOne = optionOne.votes?.includes(authedUser) || false
    const userChoseOptionTwo = optionTwo.votes?.includes(authedUser) || false
    const notAnsweredYet = !userChoseOptionOne && !userChoseOptionTwo

    return (
        <div data-testid="poll-container" className="poll-container">
            {notAnsweredYet ? (
                <UnansweredPoll poll={poll} />
            ) : (
                <AnsweredPoll poll={poll} />
            )}
        </div>
    )
}

Poll.propTypes = {
    poll: PropTypes.object.isRequired,
    authedUser: PropTypes.string.isRequired
}

const mapStateToProps = ({ authedUser, questions }, { id }) => {
	const poll = questions[id]
	return { authedUser, poll }
}

export default connect(mapStateToProps)(Poll)

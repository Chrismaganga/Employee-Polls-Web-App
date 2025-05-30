import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Poll from './Poll'
import NotFound from './NotFound'

const PollList = (props) => {
	const { idsArr } = props

	const { question_id } = useParams()
	const id = question_id.replace(':question_', '')

	return (
		<div className="poll-page">
			{idsArr.includes(id) ? <Poll id={id} /> : <NotFound page="poll" />}
		</div>
	)
}

PollList.propTypes = {
	idsArr: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = ({ questions }) => {
	const idsArr = Object.keys(questions)
	return {
		idsArr,
	}
}

export default connect(mapStateToProps)(PollList)

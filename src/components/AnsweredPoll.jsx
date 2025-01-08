import PropTypes from 'prop-types';
import formatDate from "../utils/formatDate";
import Author from "./Author";

const AnsweredPoll = ({ poll, authedUser, users }) => {
  if (!poll || !users) {
    return <div>Loading...</div>;
  }

  const { author, optionOne, optionTwo, timestamp } = poll;
  const user = users[author];
  
  if (!user) {
    return <div>User not found</div>;
  }

  const { avatarURL: avatar, name } = user;
  const date = formatDate(timestamp);

  const optionOneNum = optionOne?.votes?.length ?? 0;
  const optionTwoNum = optionTwo?.votes?.length ?? 0;
  const optionsSum = optionOneNum + optionTwoNum;
  const userChoseOptionOne = optionOne?.votes?.includes(authedUser) ?? false;

  const selectedOption = userChoseOptionOne ? optionOne : optionTwo;
  const selectedVotes = userChoseOptionOne ? optionOneNum : optionTwoNum;
  const percentage = optionsSum === 0 ? 0 : Math.round((selectedVotes / optionsSum) * 100);

  return (
    <article className="poll">
      <div className="poll-left">
        <h1 className="poll-color poll-heading">
          Would you rather
          <span className="poll-color-light" aria-label="Option one">
            {optionOne.text}
          </span>
          or 
          <span className="poll-color-light" aria-label="Option two">
            {optionTwo.text}?
          </span>
        </h1>
        <h3 className="poll-option">
          My answer: {selectedOption.text}
        </h3>
        <p>
          Votes: {selectedVotes}
          <span className="poll-percent" aria-label={`${percentage}% of total votes`}>
            {percentage}%
          </span>
        </p>
      </div>
      <div className="poll-right">
        <Author name={name} date={date} avatar={avatar} />
      </div>
    </article>
  );
};

AnsweredPoll.propTypes = {
  poll: PropTypes.shape({
    author: PropTypes.string.isRequired,
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired,
      votes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    optionTwo: PropTypes.shape({
      text: PropTypes.string.isRequired,
      votes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  authedUser: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired
};

export default AnsweredPoll;
import PropTypes from 'prop-types';
import "../styles/leaderboard.css";
import { connect } from 'react-redux';
import { useState } from "react";
import { Link } from "react-router-dom";
import Poll from "./Poll";

const LandingPage = (props) => {
  const { authedUser, questionIds, questions } = props;

  const questionsArr = questionIds.map((id) => questions[id]);

  const answeredQuestions = questionsArr.filter(
    (q) =>
      q.optionOne.votes.includes(authedUser) ||
      q.optionTwo.votes.includes(authedUser)
  );

  const unansweredQuestions = questionsArr.filter(
    (q) =>
      !q.optionOne.votes.includes(authedUser) &&
      !q.optionTwo.votes.includes(authedUser)
  );

  const [questionsToDisplay, setQuestionsToDisplay] = useState(
    unansweredQuestions
  );
  const [active, setActive] = useState(true);

  const toggleQuestions = (isActive) => {
    setQuestionsToDisplay(isActive ? unansweredQuestions : answeredQuestions);
    setActive(isActive);
  };

  return (
    <div className="dashboard">
      <h1 data-testid="test-dashboard" className="dashboard-heading">
        <button
          className={active ? "button active" : "button"}
          onClick={() => toggleQuestions(true)}
        >
          Unanswered
        </button>
        <button
          className={!active ? "button active" : "button"}
          onClick={() => toggleQuestions(false)}
        >
          Answered
        </button>
      </h1>

      <ul>
        {questionsToDisplay.length > 0 ? (
          questionsToDisplay.map((q) => (
            <li key={q.id}>
              <Link to={`/questions/:question_${q.id}`} className="none-poll">
                <Poll id={q.id} />
              </Link>
            </li>
          ))
        ) : (
          <div className="default-content">
            <p className="no-questions">
              No {active ? "unanswered" : "answered"} questions available. Please navigate to the <Link to="/add" className='create-poll'>New Poll</Link> page to create a new poll and get started!
            </p>
            <div>
              <h2>Welcome to the Polling App!</h2>
              <p>It seems you&apos;ve explored all the polls in this category.</p>
              <p>Here&apos;s what you can do next:</p>
              <ul className="links-list">
                <li>
                  <Link to="/leaderboard" className='leaderboard'> Leaderboard</Link>
                </li>
              </ul>
              <p>Thank you for being an active participant!</p>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

LandingPage.propTypes = {
  authedUser: PropTypes.string.isRequired,
  questionIds: PropTypes.array.isRequired,
  questions: PropTypes.object.isRequired,
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  authedUser,
  questions,
});

export default connect(mapStateToProps)(LandingPage);

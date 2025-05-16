import PropTypes from 'prop-types';
import "./leaderboard.css";
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Poll from "../Poll";

const LandingPage = (props) => {
  const { authedUser, questionIds, questions, users } = props;
  const currentUser = users[authedUser];
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome, {currentUser.name}! 👋</h1>
            <p className="welcome-subtitle">Join the conversation and make your voice heard!</p>
            <div className="stats-container">
              <div className="stat-box">
                <span className="stat-number">{unansweredQuestions.length}</span>
                <span className="stat-label">Polls to Answer</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{answeredQuestions.length}</span>
                <span className="stat-label">Polls Answered</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{questionIds.length}</span>
                <span className="stat-label">Total Polls</span>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <h1 data-testid="test-dashboard" className="dashboard-heading">
              <button
                className={active ? "button active" : "button"}
                onClick={() => toggleQuestions(true)}
              >
                Unanswered Polls
              </button>
              <button
                className={!active ? "button active" : "button"}
                onClick={() => toggleQuestions(false)}
              >
                Answered Polls
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
                  <div className="empty-state">
                    <h2>No {active ? "unanswered" : "answered"} polls available</h2>
                    <p>Be the first to create a new poll!</p>
                    <Link to="/add" className="create-poll-button">
                      Create New Poll
                    </Link>
                  </div>
                  <div className="quick-links">
                    <h3>Quick Links</h3>
                    <div className="links-grid">
                      <Link to="/leaderboard" className="quick-link-card">
                        <span className="link-icon">🏆</span>
                        <span className="link-text">View Leaderboard</span>
                      </Link>
                      <Link to="/add" className="quick-link-card">
                        <span className="link-icon">✏️</span>
                        <span className="link-text">Create Poll</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="time-widget">
            <div className="clock">
              <span className="time">{formatTime(currentTime)}</span>
            </div>
            <div className="date">
              <span className="date-text">{formatDate(currentDate)}</span>
            </div>
          </div>
          <div className="calendar-widget">
            <div className="calendar-header">
              <h3>Calendar</h3>
            </div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const startingDay = firstDay.getDay();
                const currentDate = i - startingDay + 1;
                const isCurrentMonth = currentDate > 0 && currentDate <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                const isToday = currentDate === date.getDate();

                return (
                  <div
                    key={i}
                    className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                  >
                    {isCurrentMonth ? currentDate : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  authedUser: PropTypes.string.isRequired,
  questionIds: PropTypes.array.isRequired,
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ questions, authedUser, users }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  authedUser,
  questions,
  users,
});

export default connect(mapStateToProps)(LandingPage);

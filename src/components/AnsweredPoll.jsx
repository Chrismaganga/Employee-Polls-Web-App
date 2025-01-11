// import PropTypes from 'prop-types';
// import formatDate from "../lib/formatDate";
// import Author from "./Author";

// const AnsweredPoll = ({ poll, authedUser, users }) => {
//   if (!poll || !users) {
//     return <div>Loading...</div>;
//   }

//   const { author, optionOne, optionTwo, timestamp } = poll;
//   const user = users[author];
  
//   if (!user) {
//     return <div>User not found</div>;
//   }

//   const { avatarURL: avatar, name } = user;
//   const date = formatDate(timestamp);

//   const optionOneNum = optionOne?.votes?.length ?? 0;
//   const optionTwoNum = optionTwo?.votes?.length ?? 0;
//   const optionsSum = optionOneNum + optionTwoNum;
//   const userChoseOptionOne = optionOne?.votes?.includes(authedUser) ?? false;

//   const selectedOption = userChoseOptionOne ? optionOne : optionTwo;
//   const selectedVotes = userChoseOptionOne ? optionOneNum : optionTwoNum;
//   const percentage = optionsSum === 0 ? 0 : Math.round((selectedVotes / optionsSum) * 100);

//   return (
//     <article className="poll">
//       <div className="poll-left">
//         <h1 className="poll-color poll-heading">
//           Would you rather
//           <span className="poll-color-light" aria-label="Option one">
//             {optionOne.text}
//           </span>
//           or 
//           <span className="poll-color-light" aria-label="Option two">
//             {optionTwo.text}?
//           </span>
//         </h1>
//         <h3 className="poll-option">
//           My answer: {selectedOption.text}
//         </h3>
//         <p>
//           Votes: {selectedVotes}
//           <span className="poll-percent" aria-label={`${percentage}% of total votes`}>
//             {percentage}%
//           </span>
//         </p>
//       </div>
//       <div className="poll-right">
//         <Author name={name} date={date} avatar={avatar} />
//       </div>
//     </article>
//   );
// };

// AnsweredPoll.propTypes = {
//   poll: PropTypes.shape({
//     author: PropTypes.string.isRequired,
//     optionOne: PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       votes: PropTypes.arrayOf(PropTypes.string).isRequired,
//     }).isRequired,
//     optionTwo: PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       votes: PropTypes.arrayOf(PropTypes.string).isRequired,
//     }).isRequired,
//     timestamp: PropTypes.number.isRequired,
//   }).isRequired,
//   authedUser: PropTypes.string.isRequired,
//   users: PropTypes.object.isRequired
// };

// export default AnsweredPoll;

import { connect } from "react-redux";
import formatDate from "../lib/formatDate";
import Author from "./Author";

const AnsweredPoll = (props) => {
  const { poll, authedUser, users } = props;
  const { author, optionOne, optionTwo, timestamp } = poll;
  const avatar = users[author].avatarURL;
  const name = users[author].name;

  const date = formatDate(timestamp);

  const optionOneNum = optionOne.votes.length;
  const optionTwoNum = optionTwo.votes.length;
  const optionsSum = optionOneNum + optionTwoNum;
  const userChoseOptionOne = optionOne.votes.includes(authedUser);

  return (
    <div className="poll">
      <div className="poll-left">
        <h1 className="poll-color poll-heading">
          Would you rather <br />
          <br />
          <span className="poll-color-light">{optionOne.text}</span>
          <br />
          or <span className="poll-color-light">{optionTwo.text}?</span>
          <br />
          <br />
        </h1>
        <h3 className="poll-option">
          My answer: {userChoseOptionOne ? optionOne.text : optionTwo.text}
        </h3>
        <p>
          Votes: {userChoseOptionOne ? optionOneNum : optionTwoNum}
          <span className="poll-percent">
            {userChoseOptionOne
              ? Math.round((optionOneNum / optionsSum) * 100)
              : Math.round((optionTwoNum / optionsSum) * 100)}{" "}
            %
          </span>
        </p>
      </div>
      <div className="poll-right">
        <Author name={name} date={date} avatar={avatar} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }, { poll }) => {
  return { authedUser, poll, users };
};

export default connect(mapStateToProps)(AnsweredPoll);

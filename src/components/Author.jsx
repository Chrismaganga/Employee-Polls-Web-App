import PropTypes from 'prop-types'

const Author = ({ name, date, avatar }) => {
  return (
    <div className="author" role="article" aria-label={`Poll author ${name}`}>
      <p className="author-name">{name}</p>
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        width="35"
        height="35"
        className="author-avatar"
      />
      <time className="author-date" dateTime={date}>{date}</time>
    </div>
  );
};

Author.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Author;
// USERS
let users = {
  johndoe: {
    id: "johndoe",
    password: "pass123",
    name: "John Doe",
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  janedoe: {
    id: "janedoe",
    password: "pass456",
    name: "Jane Doe",
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Jane+Doe",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  bobsmith: {
    id: "bobsmith",
    password: "pass789",
    name: "Bob Smith",
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Bob+Smith",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  alicegreen: {
    id: "alicegreen",
    password: "pass321",
    name: "Alice Green",
    avatarURL: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Alice+Green",
    answers: {
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: [],
  },
};

// QUESTIONS
let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "johndoe",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["johndoe"],
      text: "Build a React Native mobile app",
    },
    optionTwo: {
      votes: [],
      text: "Build a Progressive Web App",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "bobsmith",
    timestamp: 1468479767190,
    optionOne: {
      votes: ["johndoe"],
      text: "Focus on user experience",
    },
    optionTwo: {
      votes: ["bobsmith"],
      text: "Focus on performance",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "johndoe",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "Code reviews before deployment",
    },
    optionTwo: {
      votes: ["johndoe"],
      text: "Automated testing before deployment",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "janedoe",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "Weekly team meetings",
    },
    optionTwo: {
      votes: [],
      text: "Daily standup meetings",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "janedoe",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["janedoe"],
      text: "Learn GraphQL",
    },
    optionTwo: {
      votes: ["bobsmith"],
      text: "Learn REST API design",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "bobsmith",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["bobsmith"],
      text: "Monthly deployments",
    },
    optionTwo: {
      votes: ["janedoe", "alicegreen"],
      text: "Continuous deployment",
    },
  },
};

// API
export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.assign({}, users)), 1000);
  });
}

export function _getQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.assign({}, questions)), 1000);
  });
}

export function _getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      questions = Object.assign({}, questions, {
        [formattedQuestion.id]: formattedQuestion,
      });
      resolve(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = Object.assign({}, users, {
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      });

      questions = Object.assign({}, questions, {
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      });

      resolve(true);
    }, 500);
  });
}


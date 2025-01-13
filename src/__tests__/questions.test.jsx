/* eslint-disable no-undef */

import { RECEIVE_QUESTIONS, ANSWER_QUESTION, SAVE_QUESTION } from '../actions/questions';
import questions from '../reducers/questions';

describe('questions reducer', () => {
  it('should match snapshot when RECEIVE_QUESTIONS action is dispatched', () => {
    const action = {
      type: RECEIVE_QUESTIONS,
      questions: {
        'q1': { id: 'q1', optionOne: { text: 'Option One', votes: [] }, optionTwo: { text: 'Option Two', votes: [] } },
        'q2': { id: 'q2', optionOne: { text: 'Option A', votes: [] }, optionTwo: { text: 'Option B', votes: [] } },
      },
    };

    const initialState = {};
    const newState = questions(initialState, action);

    expect(newState).toMatchSnapshot();
  });

  it('should match snapshot when ANSWER_QUESTION action is dispatched', () => {
    const action = {
      type: ANSWER_QUESTION,
      qid: 'q1',
      authedUser: 'user1',
      answer: 'optionOne',
    };

    const initialState = {
      'q1': {
        id: 'q1',
        optionOne: { text: 'Option One', votes: [] },
        optionTwo: { text: 'Option Two', votes: [] },
      },
    };

    const newState = questions(initialState, action);

    expect(newState).toMatchSnapshot();
  });

  it('should match snapshot when SAVE_QUESTION action is dispatched', () => {
    const action = {
      type: SAVE_QUESTION,
      question: {
        id: 'q3',
        optionOne: { text: 'New Option One', votes: [] },
        optionTwo: { text: 'New Option Two', votes: [] },
      },
    };

    const initialState = {};
    const newState = questions(initialState, action);

    expect(newState).toMatchSnapshot();
  });
});

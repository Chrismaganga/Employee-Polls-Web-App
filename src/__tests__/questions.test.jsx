import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { 
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  SAVE_QUESTION
} from '../actions/questions';
import questions from '../reducers/questions';

describe('questions reducer', () => {
  it('should handle initial state', () => {
    expect(questions(undefined, {})).toEqual({});
  });

  it('should handle RECEIVE_QUESTIONS', () => {
    const action = {
      type: RECEIVE_QUESTIONS,
      questions: {
        'q1': {
          id: 'q1',
          author: 'johndoe',
          timestamp: 1467166872634,
          optionOne: { text: 'option one', votes: [] },
          optionTwo: { text: 'option two', votes: [] }
        }
      }
    };
    
    const expectedState = {
      'q1': {
        id: 'q1',
        author: 'johndoe',
        timestamp: 1467166872634,
        optionOne: { text: 'option one', votes: [] },
        optionTwo: { text: 'option two', votes: [] }
      }
    };

    expect(questions({}, action)).toEqual(expectedState);
  });

  it('should handle ANSWER_QUESTION', () => {
    const initialState = {
      'q1': {
        id: 'q1',
        author: 'johndoe',
        optionOne: { text: 'option one', votes: [] },
        optionTwo: { text: 'option two', votes: [] }
      }
    };

    const action = {
      type: ANSWER_QUESTION,
      qid: 'q1',
      answer: 'optionOne',
      authedUser: 'janedoe'
    };

    const expectedState = {
      'q1': {
        id: 'q1',
        author: 'johndoe',
        optionOne: { text: 'option one', votes: ['janedoe'] },
        optionTwo: { text: 'option two', votes: [] }
      }
    };

    expect(questions(initialState, action)).toEqual(expectedState);
  });

  it('should handle SAVE_QUESTION', () => {
    const action = {
      type: SAVE_QUESTION,
      question: {
        id: 'q2',
        author: 'johndoe',
        timestamp: 1467166872634,
        optionOne: { text: 'new option one', votes: [] },
        optionTwo: { text: 'new option two', votes: [] }
      }
    };

    const expectedState = {
      'q2': {
        id: 'q2',
        author: 'johndoe',
        timestamp: 1467166872634,
        optionOne: { text: 'new option one', votes: [] },
        optionTwo: { text: 'new option two', votes: [] }
      }
    };

    expect(questions({}, action)).toEqual(expectedState);
  });
});
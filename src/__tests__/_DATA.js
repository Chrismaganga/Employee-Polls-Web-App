/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { expect, describe } from '@jest/globals';
import {
  _getUsers,
  _getQuestions,
  _getInitialData,
  formatQuestion,
  _saveQuestion,
  _saveQuestionAnswer,
  generateUID,
} from '../lib/_DATA';

describe('_DATA.js Snapshots', () => {
  it('should match users snapshot', async () => {
    const users = await _getUsers();
    expect(users).toMatchSnapshot();
  });

  it('should match questions snapshot', async () => {
    const questions = await _getQuestions();
    expect(questions).toMatchSnapshot();
  });

  it('should match initial data snapshot', async () => {
    const initialData = await _getInitialData();
    expect(initialData).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undef
  it('should match formatted question snapshot', () => {
    const questionData = {
      optionOneText: 'Option One Test',
      optionTwoText: 'Option Two Test',
      author: 'johndoe'
    };
    const formattedQuestion = formatQuestion(questionData);
    // Remove timestamp and id for consistent snapshots
    // eslint-disable-next-line no-unused-vars
    const { timestamp, id, ...rest } = formattedQuestion;
    expect(rest).toMatchSnapshot();
  });

  it('should match saved question snapshot', async () => {
    const newQuestion = {
      optionOneText: 'New Option One',
      optionTwoText: 'New Option Two',
      author: 'johndoe'
    };
    const savedQuestion = await _saveQuestion(newQuestion);
    // Remove timestamp and id for consistent snapshots
    const { timestamp, id, ...rest } = savedQuestion;
    expect(rest).toMatchSnapshot();
  });

  it('should match saved answer snapshot', async () => {
    const answerData = {
      authedUser: 'johndoe',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };
    const result = await _saveQuestionAnswer(answerData);
    expect(result).toMatchSnapshot();
  });

  it('should generate a unique ID string', () => {
    const uid1 = generateUID();
    const uid2 = generateUID();
    
    expect(typeof uid1).toBe('string');
    expect(uid1.length).toBeGreaterThan(0);
    expect(uid1).not.toBe(uid2); // Two generated IDs should be different
  });
});
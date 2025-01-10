
/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import Leaderboard from '../components/Leaderboard';
import reducer from '../reducers';

// Simple mock data with clear scoring differences
const mockUsers = {
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: 'avatar1.jpg',
    answers: { q1: 'optionOne', q2: 'optionTwo' },
    questions: ['q1']
  },
  janedoe: {
    id: 'janedoe',
    name: 'Jane Doe',
    avatarURL: 'avatar2.jpg',
    answers: { q1: 'optionOne' },
    questions: []
  }
};

const store = createStore(reducer, {
  users: mockUsers,
  authedUser: null,
  questions: {},
  loadingBar: { default: 0 }
});

describe('Leaderboard Component', () => {
  it('renders the leaderboard title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );
    expect(getByText('Leaderboard')).toBeInTheDocument();
  });

  it('displays users in correct order based on score', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );
    
    const names = getAllByText(/John Doe|Jane Doe/);
    expect(names[0].textContent).toBe('John Doe'); // 3 points (2 answers + 1 question)
    expect(names[1].textContent).toBe('Jane Doe'); // 1 point (1 answer + 0 questions)
  });

  it('displays correct question counts', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Check John Doe's stats (2 answers, 1 question)
    expect(getByText('Questions: 1')).toBeInTheDocument();
    expect(getByText('Answers: 2')).toBeInTheDocument();

    // Check Jane Doe's stats (1 answer, 0 questions)
    expect(getByText('Questions: 0')).toBeInTheDocument();
    expect(getByText('Answers: 1')).toBeInTheDocument();
  });
});
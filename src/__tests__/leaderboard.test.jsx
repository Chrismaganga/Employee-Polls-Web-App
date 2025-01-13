/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Leaderboard from '../components/Leaderboard'

const mockStore = (state) => {
  return createStore((state) => state, state)
}

describe('Leaderboard Component', () => {
  it('should match snapshot', () => {
    const mockUsers = {
      'user1': {
        id: 'user1',
        name: 'John Doe',
        avatarURL: 'https://example.com/avatar1.png',
        questions: ['q1', 'q2'],
        answers: { 'q3': 'optionOne' }
      },
      'user2': {
        id: 'user2',
        name: 'Jane Smith',
        avatarURL: 'https://example.com/avatar2.png',
        questions: ['q4'],
        answers: { 'q3': 'optionTwo' }
      }
    }

    const store = mockStore({
      users: mockUsers
    })

    const { asFragment } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

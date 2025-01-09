import { render, screen } from '@testing-library/react';
import { expect, describe, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';

const mockStore = configureStore([]);

describe('Login Component', () => {
  test('renders login form', () => {
    const store = mockStore({
      users: {}
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Check for the presence of key elements
    expect(screen.getByText('Employee Polls')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const store = mockStore({
      users: {}
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    
    expect(container).toMatchSnapshot();
  });
});
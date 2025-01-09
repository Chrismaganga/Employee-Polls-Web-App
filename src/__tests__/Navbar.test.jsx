import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import Navbar from '../components/Navbar';

const mockStore = configureStore([]);

test('renders navbar with user logged in', () => {
    const store = mockStore({
      authedUser: 'johndoe',
      users: { 
        johndoe: { 
            name: 'John Doe', 
            avatarURL: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe' 
        } 
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Check if user name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if navbar exists
    const navElement = screen.getByTestId('navbar');
    expect(navElement).toBeInTheDocument();
    
    // Check if navigation links exist
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('New Poll')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    
    // Check if logout button exists
    expect(screen.getByTestId('test-logout')).toBeInTheDocument();
});
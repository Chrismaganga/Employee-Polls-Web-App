# Employees-polls-web-app

-**react-redux-jest**
This is a React application that uses Redux for state management and Jest for testing. The application includes features such as user authentication, polling, and leaderboard functionalities.

## Features

- User authentication
- Poll creation and voting
- Leaderboard display
- Error handling and routing with React Router

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Redux-toolkit**: A state management library for JavaScript applications
- **React Router**: For handling routing and navigation
- **Jest**: A testing framework for JavaScript
- **React Testing Library**: For testing React components

1. **Clone the repository**
git clone https://github.com/Chrismaganga/-Employee-Polls-Web-App

cd Employee-Polls-Web-App

npm install

npm run dev
npm test

<!-- Reviewer Note -->

The same issue as stated above.

The following two unit tests must be present for _saveQuestion():

An async unit test to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.
An async unit test to verify that an error is returned if incorrect data is passed to the function.
<!--  -->
The following two unit tests must be present for _saveQuestionAnswer():

An async unit test to verify that true is returned when correctly formatted data is passed to the function.
An async unit test to verify that an error is returned if incorrect data is passed to the function.
<!-- hhjk -->
At least one test must call the toMatchSnapshot() function from jest. Doing this will generate a folder called snapshots where the snapshot will be stored.
<!--  -->
At least one unit test must use the render method from @testing-library/react to render one of your React components. The unit test should then perform some actions on the component using fireEvent such as fireEvent.click() or fireEvent.change(). After calling fireEvent, call the expect() method from jest to verify that a change occurred in the UI after the event was fired.
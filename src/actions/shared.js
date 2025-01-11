import { _getInitialData } from "../lib/_DATA";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(showLoading());
    const { users, questions } = await _getInitialData();
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
    dispatch(hideLoading());
  };
}

export function handleLogin(AUTHED_ID) {
  return async (dispatch) => {
    dispatch(setAuthedUser(AUTHED_ID));
  };
}


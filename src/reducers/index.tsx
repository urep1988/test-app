import {
  Reducer,
  AnyAction,
} from 'redux';

import {
  FETCH_QUESTIONS,
  FETCH_MORE_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  SET_QUESTION,
  DELETE_QUESTION,
} from '../actions/actionTypes';
import {
  State,
} from '../types/store';

export const initialState: State = {
  loading: false,
  error: null,
  questions: [],
  activeQuestion: null,
  token: null,
};

const reducer: Reducer<State, AnyAction> = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_QUESTIONS:
      return {
        ...initialState,
        loading: true,
      }
    case FETCH_MORE_QUESTIONS:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        token: payload.token,
        questions: [
          ...state.questions,
          ...payload.questions,
        ],
        error: null,
        loading: false,
      }
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case SET_QUESTION:
      return {
        ...state,
        activeQuestion: payload,
      }
    case DELETE_QUESTION:
      state.questions.splice(payload, 1);
      return {
        ...state,
        questions: [...state.questions]
      }
    default:
      return state
  }
}

export default reducer;
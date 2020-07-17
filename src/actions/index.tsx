import { AnyAction } from 'redux';
import {
   FETCH_QUESTIONS,
   FETCH_MORE_QUESTIONS,
   FETCH_QUESTIONS_SUCCESS,
   FETCH_QUESTIONS_FAILURE,
   SET_QUESTION,
   DELETE_QUESTION,
} from './actionTypes';
import {
   Question,
 } from '../types/store';

export const fetchQuestions = (): AnyAction => ({
   type: FETCH_QUESTIONS,
});

export const fetchMoreQuestions = (): AnyAction => ({
   type: FETCH_MORE_QUESTIONS,
});

export const fetchQuestionsSuccess = (payload: {
   questions: Array<Question>;
   token: string;
}): AnyAction => ({
   type: FETCH_QUESTIONS_SUCCESS,
   payload,
});

export const fetchQuestionsFailure = (message: string = 'Something went wrong'): AnyAction => ({
   type: FETCH_QUESTIONS_FAILURE,
   payload: {
      message,
   }
});

export const setQuestion = (payload: string | null): AnyAction => ({
   type: SET_QUESTION,
   payload,
});

export const deleteQuestion = (payload: number | null): AnyAction => ({
   type: DELETE_QUESTION,
   payload,
});

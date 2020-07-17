import {
   FETCH_QUESTIONS,
   FETCH_MORE_QUESTIONS,
   FETCH_QUESTIONS_SUCCESS,
   FETCH_QUESTIONS_FAILURE,
} from './actionTypes';
import {
   Action,
 } from '../types/store';

export const fetchQuestions = (): Action => ({
   type: FETCH_QUESTIONS,
});

export const fetchMoreQuestions = (): Action => ({
   type: FETCH_MORE_QUESTIONS,
});

export const fetchQuestionsSuccess = (): Action => ({
   type: FETCH_QUESTIONS_SUCCESS,
});

export const fetchQuestionsFailure = (): Action => ({
   type: FETCH_QUESTIONS_FAILURE,
});

import { put, takeLatest, all, select, call } from 'redux-saga/effects';

import {
  FETCH_QUESTIONS,
  FETCH_MORE_QUESTIONS,
} from '../actions/actionTypes';

import {
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} from '../actions';

function* fetchQuestionsWorker() {
  try {
    const responseToken = yield fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = yield responseToken.json();

    yield call(fetchQuestions, token);
  } catch(e) {
    yield put(fetchQuestionsFailure());
  }
}

function* fetchMoreQuestionsWorker() {
  const { token } = yield select();

  yield call(fetchQuestions, token);
}

function* fetchQuestions(token: string) {
  try {
    const response = yield fetch(`https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple&token=${token}`);
    const { response_code, results } = yield response.json();
    
    if (response_code === 0) {
      yield put(fetchQuestionsSuccess({
        questions: results,
        token,
      }));
    } else {
      yield put(fetchQuestionsFailure(response_code === 4 ? 'All possible questions are loaded' : 'Something went wrong'));
    }
  } catch(e) {
    yield put(fetchQuestionsFailure());
  }
}

function* actionWatcher() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsWorker);
  yield takeLatest(FETCH_MORE_QUESTIONS, fetchMoreQuestionsWorker);
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
}
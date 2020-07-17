import { put, takeLatest, all } from 'redux-saga/effects';

import {
  fetchQuestions,
  fetchMoreQuestions,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} from '../actions';

function* fetchQuestionsWorker() {
  const response = yield fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
  const responseJson = yield response.json();

  console.info(9999999, responseJson)

  // yield put({ type: "NEWS_RECEIVED", json: json.articles, });
}

function* actionWatcher() {
  yield takeLatest(fetchQuestions, fetchQuestionsWorker)
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
}
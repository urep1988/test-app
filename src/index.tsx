import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from './reducers';
import rootSaga from './sagas'
import './index.css';
import App from './components/App';

const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // @ts-ignore
  const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);
  return Store;
}

ReactDOM.render(
  <Provider store={createAppStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

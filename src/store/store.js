import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { dataReducer } from './dataReducer.js';
import { signReducer } from './signReducer.js';
import { articleReducer } from './articleReducer.js';
import { userReducer } from './userReducer.js';
import { thunk } from 'redux-thunk';

const middleware = [thunk];

const rootReducer = combineReducers({
  data: dataReducer,
  signUp: signReducer,
  article: articleReducer,
  user: userReducer
});

const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

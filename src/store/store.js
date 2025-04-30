import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { dataReducer } from "./dataReducer.js";
import { signReducer } from "./signReducer.js";
import { articleReducer } from "./articleReducer.js";
import { userReducer } from "./userReducer.js";

const middleware = [thunk];

const rootReducer = combineReducers({
  data: dataReducer,
  signUp: signReducer,
  article: articleReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.(
    applyMiddleware(...middleware)
  ) || applyMiddleware(...middleware)
);

export default store;

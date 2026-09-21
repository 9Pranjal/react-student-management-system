import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import studentReducer from './reducer';

// Redux store with thunk middleware (needed for async actions).
// Store shape: { students: [], loading: false, error: null }
const store = createStore(studentReducer, applyMiddleware(thunk));

export default store;

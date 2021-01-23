import { createStore, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { batchDispatchMiddleware } from 'redux-batched-actions';
import rootReducer from "./Reducers";

export default createStore(rootReducer, /* preloadedState, */ //composeWithDevTools(
    applyMiddleware(batchDispatchMiddleware)
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    //)
);
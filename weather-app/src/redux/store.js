
import {legacy_createStore} from "redux"
import { combineReducers } from "redux"
import { compose } from "redux"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"



let composeEnhancers = compose;
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({
    // ...your other reducers here

})

export const store=legacy_createStore(rootReducer,enhancer)







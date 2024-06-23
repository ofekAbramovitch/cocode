import { combineReducers, legacy_createStore as createStore } from 'redux'
import { codeReducer } from './code/code.reducer'
import { userReducer } from './user/user.reducer'

const rootReducer = combineReducers({
    codeModule: codeReducer,
    userModule: userReducer
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

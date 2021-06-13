import {createStore, applyMiddleware} from "redux"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {fetchMiddleware} from './middlewares'

const enhancer = applyMiddleware(thunk, fetchMiddleware, logger)
const store = createStore(reducer, enhancer)

export default store
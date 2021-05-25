import {combineReducers} from 'redux'
import projectReducer, {moduleName as projectModule} from '../modules/project'

export default combineReducers({
  [projectModule]: projectReducer,
})
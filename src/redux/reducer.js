import {combineReducers} from 'redux'
import projectReducer, {moduleName as projectModule} from '../modules/project'
import taskReducer, {moduleName as taskModule} from '../modules/task'

export default combineReducers({
  [projectModule]: projectReducer,
  [taskModule]: taskReducer
})
import {createSelector} from "reselect"
import axios from 'axios'

/**
 * Constants
 * */


export const moduleName = 'project'
const prefix = moduleName

export const FETCH_PROJECT_LIST = `${prefix}/FETCH_PROJECT_LIST`
export const SET_ACTIVE_PROJECT = `${prefix}/SET_ACTIVE_PROJECT`
export const CREATE_PROJECT = `${prefix}/CREATE_PROJECT`
export const UPDATE_PROJECT = `${prefix}/UPDATE_PROJECT`
export const DELETE_PROJECT = `${prefix}/DELETE_PROJECT`

/**
 * Reducer
 * */

export const ReducerRecord = {
  projectList: null, // [{...}, {...}]
  activeProject: null
}


export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action
  switch (type) {
    case FETCH_PROJECT_LIST:
    case UPDATE_PROJECT:
    case DELETE_PROJECT:
    case CREATE_PROJECT:
      return Object.assign({}, state, {
        projectList: payload
      })
    case SET_ACTIVE_PROJECT:
      return Object.assign({}, state, {
        activeProject: payload
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const projectListSelector = createSelector(stateSelector, state => state.projectList)
export const activeProjectSelector = createSelector(stateSelector, state => state.projectList && state.projectList.find(f => f.id === state.activeProject))


/**
 * Action creators
 * */

export const setActiveProject = (projectId) => ({
  type: SET_ACTIVE_PROJECT,
  payload: projectId
})



/**
 * Redux thunks
 * */

export const fetchProjectList = () => (dispatch) => {
  axios('http://localhost:8000/project')
    .then(({data : {data}}) => dispatch({
      type: FETCH_PROJECT_LIST,
      payload: data
    }))
}

export const createNewProject = (newProject) => (dispatch, getState) => {
  const {projectList} = getState()[moduleName]
  axios.post('http://localhost:8000/project', newProject)
    .then(({data}) => dispatch({
      type: CREATE_PROJECT,
      payload: [...projectList, data]
    }))
}

export const updateProject = (newProject) => (dispatch, getState) => {
  const {projectList} = getState()[moduleName]
  axios.put('http://localhost:8000/project', newProject)
    .then(({data}) => dispatch({
      type: UPDATE_PROJECT,
      payload: projectList.map(project => {
        if(newProject.id === project.id) {
          return newProject
        } else {
          return project
        }
      })
    }))
}

export const removeProject = (id) => (dispatch, getState) => {
  const {projectList} = getState()[moduleName]
  axios({
    method: 'DELETE',
    url: 'http://localhost:8000/project',
    data: {id}
  })
    .then(() => dispatch({
      type: DELETE_PROJECT,
      payload: projectList.filter(f => f.id !== id)
    }))
}
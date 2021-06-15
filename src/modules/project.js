import {createSelector} from "reselect"
import axios from 'axios'

/**
 * Constants
 * */


export const moduleName = 'project'
const prefix = moduleName

export const FETCH_PROJECT_LIST_REQUEST = `${prefix}/FETCH_PROJECT_LIST_REQUEST`
export const FETCH_PROJECT_LIST_SUCCESS = `${prefix}/FETCH_PROJECT_LIST_SUCCESS`
export const FETCH_PROJECT_LIST_ERROR = `${prefix}/FETCH_PROJECT_LIST_ERROR`

export const CREATE_PROJECT_REQUEST = `${prefix}/CREATE_PROJECT_REQUEST`
export const CREATE_PROJECT_SUCCESS = `${prefix}/CREATE_PROJECT_SUCCESS`
export const CREATE_PROJECT_ERROR = `${prefix}/CREATE_PROJECT_ERROR`

export const UPDATE_PROJECT_REQUEST = `${prefix}/UPDATE_PROJECT_REQUEST`
export const UPDATE_PROJECT_SUCCESS = `${prefix}/UPDATE_PROJECT_SUCCESS`
export const UPDATE_PROJECT_ERROR = `${prefix}/UPDATE_PROJECT_ERROR`

export const DELETE_PROJECT_REQUEST = `${prefix}/DELETE_PROJECT_REQUEST`
export const DELETE_PROJECT_SUCCESS = `${prefix}/DELETE_PROJECT_SUCCESS`
export const DELETE_PROJECT_ERROR = `${prefix}/DELETE_PROJECT_ERROR`

export const SET_ACTIVE_PROJECT = `${prefix}/SET_ACTIVE_PROJECT`


/**
 * Reducer
 * */

export const ReducerRecord = {
  projectList: null, // [{...}, {...}]
  activeProject: null,
  projectError: null
}


export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action
  switch (type) {
    case FETCH_PROJECT_LIST_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
    case DELETE_PROJECT_SUCCESS:
    case CREATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projectList: payload
      })
    case SET_ACTIVE_PROJECT:
      return Object.assign({}, state, {
        activeProject: payload
      })
    case FETCH_PROJECT_LIST_ERROR:
    case CREATE_PROJECT_ERROR:
    case UPDATE_PROJECT_ERROR:
    case DELETE_PROJECT_ERROR:
      return Object.assign({}, state, {
        projectError: payload
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
export const errorProjectSelector = createSelector(stateSelector, state => state.projectError)


/**
 * Action creators
 * */

export const setActiveProject = (projectId) => ({
  type: SET_ACTIVE_PROJECT,
  payload: projectId
})

export const fetchProjectList = () => ({
  type: FETCH_PROJECT_LIST_REQUEST
})

export const createNewProject = (newProject) => ({
  type: CREATE_PROJECT_REQUEST,
  payload: newProject
})

/**
 * Redux thunks
 * */


// export const createNewProject = (newProject) => (dispatch, getState) => {
//   const {projectList} = getState()[moduleName]
//   axios.post('http://localhost:8000/project', newProject)
//     .then(({data}) => dispatch({
//       type: CREATE_PROJECT,
//       payload: [...projectList, data]
//     }))
// }

export const updateProject = (newProject) => (dispatch, getState) => {
  const {projectList} = getState()[moduleName]
  axios.put('http://localhost:8000/project', newProject)
    .then(({data}) => dispatch({
      type: UPDATE_PROJECT_REQUEST,
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
      type: DELETE_PROJECT_REQUEST,
      payload: projectList.filter(f => f.id !== id)
    }))
}
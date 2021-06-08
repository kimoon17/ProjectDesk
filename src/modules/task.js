import {createSelector} from 'reselect'
import axios from 'axios'

/**
 * Constants
 */

export const moduleName = 'task'
const prefix = moduleName

export const FETCH_TASK_LIST = `${prefix}/FETCH_TASK_LIST`
export const SET_ACTIVE_TASK = `${prefix}/SET_ACTIVE_TASK`
export const CREATE_TASK = `${prefix}/CREATE_TASK`
export const UPDATE_TASK = `${prefix}/UPDATE_TASK`
export const DELETE_TASK = `${prefix}/DELETE_TASK`
export const FETCH_TASK_STATUSES = `${prefix}/FETCH_TASK_STATUSES`
export const FETCH_TASK_TYPES = `${prefix}/FETCH_TASK_TYPES`

/**
 * Reducers
 */

export const ReducerRecord = {
    taskList: null,
    activeTask: null
}

export default function reducer(state = ReducerRecord, action) {
    const {type, payload} = action
    switch(type) {
        case FETCH_TASK_TYPES:
        case FETCH_TASK_STATUSES:
        case FETCH_TASK_LIST:
        case UPDATE_TASK:
        case DELETE_TASK:
        case CREATE_TASK:
            return Object.assign({}, state, {
                taskList: payload
            })
        case SET_ACTIVE_TASK:
            return Object.assign({}, state, {
                activeTask: payload
            })
        default:
            return state
    }
}

/**
 * Selectors
 */

export const stateSelector = state => state[moduleName]
export const taskListSelector = createSelector(stateSelector, state => state.taskList)
export const activeTaskSelector = createSelector(stateSelector, state => state.activeTask)

/**
 * Action creators
 */

export const setActiveTask = (task) => ({
    type: SET_ACTIVE_TASK,
    payload: task
})

/**
 * Redux thunks
 */

export const fetchTaskList = (project_id) => (dispatch) => {
    const url = project_id ? 'http://localhost:8000/task/' + project_id : 'http://localhost:8000/task'
    axios(url)
        .then(({data: {data}}) => dispatch({
            type: FETCH_TASK_LIST,
            payload: data
        }))
}

export const createNewTask = (newTask) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]
    axios.post('http://localhost:8000/task', newTask)
        .then(({data : {data}}) => dispatch({
            type: CREATE_TASK,
            payload: [...taskList, data[0]]
        }))
}

export const updateTask = (newTask) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]
    axios.put('http://localhost:8000/task', newTask)
        .then(({data}) => dispatch({
            type: UPDATE_TASK,
            payload: taskList.map(task => {
                if (newTask.id === task.id) {
                    return newTask
                } else {
                    return task
                }
            })
        }))
}

export const removeTask = (id) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]
    axios({
        method: 'DELETE',
        url: 'http://localhost:8000/task',
        data: {id}
    })
        .then(() => dispatch({
            type: DELETE_TASK,
            payload: taskList.filter(f => f.id !== id)
        }))
}

export const fetchTaskStatuses = (id) => (dispatch) => {
    axios('http://localhost:8000/status')
        .then(({data: {data}}) => dispatch({
            type: FETCH_TASK_STATUSES,
            payload: data
        }))
}

export const fetchTaskTypes = (id) => (dispatch) => {
    axios ('http://localhost:8000/type')
        .then(({data: {data}}) => dispatch({
            type: FETCH_TASK_TYPES,
            payload: data
        }))
}


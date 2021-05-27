import {createSelector} from 'reselect'
import axios from 'axios'

/**
 * Constants
 */

export const moduleName = 'task'
const prefix = moduleName

export const FETCH_TASK_LIST = `${prefix}/FETCH_TASK_LIST`
export const FETCH_TASK = `${prefix}/FETCH_TASK`
export const CREATE_TASK = `${prefix}/CREATE_TASK`
export const UPDATE_TASK = `${prefix}/UPDATE_TASK`
export const DELETE_TASK = `${prefix}/DELETE_TASK`

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
        case FETCH_TASK_LIST:
        case UPDATE_TASK:
        case DELETE_TASK:
        case CREATE_TASK:
            return Object.assign({}, state, {
                taskList: payload
            })
        case FETCH_TASK:
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

/**
 * Redux thunks & Action creators
 */

export const fetchTaskList = () => (dispatch) => {
    axios('http://localhost:8000/task')
        .then(({data: {data}}) => dispatch({
            type: FETCH_TASK_LIST,
            payload: data
        }))
}

export const createNewTask = (newTask) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]
    axios.post('http://localhost:8000/task', newTask)
        .then(({data}) => dispatch({
            type: CREATE_TASK,
            payload: [...taskList, data]
        }))
}

export const removeTask = (id) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]
    axios({
        method: 'DELETE',
        url: 'http://localhost:8000/project',
        data: {id}
    })
        .then(() => dispatch({
            type: DELETE_TASK,
            payload: taskList.filter(f => f.id !== id)
        }))
}


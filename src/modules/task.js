import {createSelector} from 'reselect'

/**
 * Constants
 */

export const moduleName = 'task'
const prefix = moduleName

export const FETCH_TASK_LIST_REQUEST = `${prefix}/FETCH_TASK_LIST_REQUEST`
export const FETCH_TASK_LIST_SUCCESS = `${prefix}/FETCH_TASK_LIST_SUCCESS`
export const FETCH_TASK_LIST_ERROR = `${prefix}/FETCH_TASK_LIST_ERROR`

export const CREATE_TASK_REQUEST = `${prefix}/CREATE_TASK_REQUEST`
export const CREATE_TASK_SUCCESS = `${prefix}/CREATE_TASK_SUCCESS`
export const CREATE_TASK_ERROR = `${prefix}/CREATE_TASK_ERROR`

export const UPDATE_TASK_REQUEST = `${prefix}/UPDATE_TASK_REQUEST`
export const UPDATE_TASK_SUCCESS = `${prefix}/UPDATE_TASK_SUCCESS`
export const UPDATE_TASK_ERROR = `${prefix}/UPDATE_TASK_ERROR`

export const DELETE_TASK_REQUEST = `${prefix}/DELETE_TASK_REQUEST`
export const DELETE_TASK_SUCCESS = `${prefix}/DELETE_TASK_SUCCESS`
export const DELETE_TASK_ERROR = `${prefix}/DELETE_TASK_ERROR`

export const FETCH_TASK_STATUSES_REQUEST = `${prefix}/FETCH_TASK_STATUSES_REQUEST`
export const FETCH_TASK_STATUSES_SUCCESS = `${prefix}/FETCH_TASK_STATUSES_SUCCESS`
export const FETCH_TASK_STATUSES_ERROR = `${prefix}/FETCH_TASK_STATUSES_ERROR`

export const FETCH_TASK_TYPES_REQUEST = `${prefix}/FETCH_TASK_TYPES_REQUEST`
export const FETCH_TASK_TYPES_SUCCESS = `${prefix}/FETCH_TASK_TYPES_SUCCESS`
export const FETCH_TASK_TYPES_ERROR = `${prefix}/FETCH_TASK_TYPES_ERROR`

export const SET_ACTIVE_TASK = `${prefix}/SET_ACTIVE_TASK`

/**
 * Reducers
 */

export const ReducerRecord = {
    taskList: null,
    activeTask: null,
    statusList: undefined,
    typeList: undefined
}

export default function reducer(state = ReducerRecord, action) {
    const {type, payload} = action
    switch(type) {
        case FETCH_TASK_TYPES_SUCCESS:
            return Object.assign({}, state, {
                typeList: payload
            })
        case FETCH_TASK_STATUSES_SUCCESS:
            return Object.assign({}, state, {
                statusList: payload
            })
        case FETCH_TASK_LIST_SUCCESS:
        case UPDATE_TASK_SUCCESS:
        case DELETE_TASK_SUCCESS:
        case CREATE_TASK_SUCCESS:
            return Object.assign({}, state, {
                taskList: payload
            })
        case SET_ACTIVE_TASK:
            return Object.assign({}, state, {
                activeTask: payload
            })
        case FETCH_TASK_LIST_ERROR:
        case CREATE_TASK_ERROR:
        case UPDATE_TASK_ERROR:
        case DELETE_TASK_ERROR:
        case FETCH_TASK_STATUSES_ERROR:
        case FETCH_TASK_TYPES_ERROR:
            return Object.assign({}, state, {
                taskError: payload
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

export const typeListSelector = createSelector(stateSelector, state => state.typeList)
export const statusListSelector = createSelector(stateSelector, state => state.statusList)

/**
 * Action creators
 */

export const setActiveTask = (task) => ({
    type: SET_ACTIVE_TASK,
    payload: task
})

export const fetchTaskList = (project_id, limit, offset) => ({
    type: FETCH_TASK_LIST_REQUEST,
    payload: {body: null, query: project_id, get: {limit, offset}}
})

export const createNewTask = (newTask) => ({
    type: CREATE_TASK_REQUEST,
    payload: {body: newTask}
})

export const updateTask = (newTask) => ({
    type: UPDATE_TASK_REQUEST,
    payload: {body: newTask}
})

export const removeTask = (id) => ({
    type: DELETE_TASK_REQUEST,
    payload: {body: {id}}
})

export const fetchTaskStatuses = () => ({
    type: FETCH_TASK_STATUSES_REQUEST
})

export const fetchTaskTypes = () => ({
    type: FETCH_TASK_TYPES_REQUEST
})


/**
 * Redux thunks
 */

// export const fetchTaskList = (project_id) => (dispatch) => {
//     const url = project_id ? 'http://localhost:8000/task/' + project_id : 'http://localhost:8000/task'
//     axios(url)
//         .then(({data: {data}}) => dispatch({
//             type: FETCH_TASK_LIST,
//             payload: data
//         }))
// }

// export const createNewTask = (newTask) => (dispatch, getState) => {
//     const {taskList} = getState()[moduleName]
//     axios.post('http://localhost:8000/task', newTask)
//         .then(({data : {data}}) => dispatch({
//             type: CREATE_TASK,
//             payload: [...taskList, data[0]]
//         }))
// }

// export const updateTask = (newTask) => (dispatch, getState) => {
//     const {taskList} = getState()[moduleName]
//     axios.put('http://localhost:8000/task', newTask)
//         .then(({data}) => dispatch({
//             type: UPDATE_TASK,
//             payload: taskList.map(task => {
//                 if (newTask.id === task.id) {
//                     return newTask
//                 } else {
//                     return task
//                 }
//             })
//         }))
// }

// export const removeTask = (id) => (dispatch, getState) => {
//     const {taskList} = getState()[moduleName]
//     axios({
//         method: 'DELETE',
//         url: 'http://localhost:8000/task',
//         data: {id}
//     })
//         .then(() => dispatch({
//             type: DELETE_TASK,
//             payload: taskList.filter(f => f.id !== id)
//         }))
// }

// export const fetchTaskStatuses = () => (dispatch) => {
//     axios('http://localhost:8000/task/status')
//         .then(({data}) => dispatch({
//             type: FETCH_TASK_STATUSES,
//             payload: data
//         }))
// }
//
// export const fetchTaskTypes = () => (dispatch) => {
//     axios ('http://localhost:8000/task/type')
//         .then(({data}) => dispatch({
//             type: FETCH_TASK_TYPES,
//             payload: data
//         }))
// }


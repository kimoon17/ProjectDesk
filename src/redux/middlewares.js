import {
  CREATE_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  FETCH_PROJECT_LIST_REQUEST,
  UPDATE_PROJECT_REQUEST
} from '../modules/project'
import {
  FETCH_TASK_LIST_REQUEST, FETCH_TASK_STATUSES_REQUEST, FETCH_TASK_TYPES_REQUEST,
  CREATE_TASK_REQUEST, UPDATE_TASK_REQUEST, DELETE_TASK_REQUEST
} from '../modules/task'

import axios from 'axios'
import queryString from 'query-string'

const apiList = (body, query, get) => {
  // {limit : 2, offset: 0} --> queryString.stringify ----> 'limit=2&offset=0'
  // 'limit=2&offset=0' --> queryString.parse ----> {limit : 2, offset: 0}

  const getParams = '?' + queryString.stringify(get) || ''
  const queryParam = query || ''
  return {
    [FETCH_TASK_LIST_REQUEST]: {
      url: 'http://localhost:8000/task/' + queryParam + getParams,
      method: 'get',
      selector: data => data
    },
    [FETCH_PROJECT_LIST_REQUEST]: {
      url: 'http://localhost:8000/project/' + queryParam + getParams,
      method: 'get',
      selector: ({data}) => data
    },
    [CREATE_PROJECT_REQUEST]: {
      url: 'http://localhost:8000/project',
      method: 'post',
      selector: ({data}) => data,
      data: body
    },
    [UPDATE_PROJECT_REQUEST]: {
      url: 'http://localhost:8000/project',
      method: 'put',
      selector: ({data}) => data,
      data: body
    },
    [DELETE_PROJECT_REQUEST]: {
      url: 'http://localhost:8000/project',
      method: 'delete',
      selector: ({data}) => data,
      data: body
    },
    [FETCH_TASK_STATUSES_REQUEST]: {
      url: 'http://localhost:8000/task/status',
      method: 'get',
      selector: ({data}) => data,
      data: body
    },
    [FETCH_TASK_TYPES_REQUEST]: {
      url: 'http://localhost:8000/task/type',
      method: 'get',
      selector: ({data}) => data,
      data: body
    },
    [CREATE_TASK_REQUEST]: {
      url: 'http://localhost:8000/task',
      method: 'post',
      selector: ({data}) => data,
      data: body
    },
    [UPDATE_TASK_REQUEST] : {
      url: 'http://localhost:8000/task',
      method: 'put',
      selector: ({data}) => data,
      data: body
    },
    [DELETE_TASK_REQUEST] : {
      url: 'http://localhost:8000/task',
      method: 'delete',
      selector: ({data}) => data,
      data: body
    },
  }
}


export const fetchMiddleware = storeApi => next => action => {
  if (action.type.includes('REQUEST')) {

    const getApi = apiList(action.payload?.body, action.payload?.query, action.payload?.get)[action.type]
    axios({
      url: getApi.url,
      method: getApi.method,
      data: getApi.data || ''
    }).then(({data}) => {
      storeApi.dispatch({
        type: action.type.replace('REQUEST', 'SUCCESS'),
        payload: getApi.selector(data)
      })
    }).catch(err => {
      storeApi.dispatch({
        type: action.type.replace('REQUEST', 'ERROR'),
        payload: err.message
      })
    })
  }

  return next(action)
}
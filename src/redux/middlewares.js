import {FETCH_PROJECT_LIST_REQUEST, CREATE_PROJECT_REQUEST, UPDATE_PROJECT_REQUEST, DELETE_PROJECT_REQUEST} from '../modules/project'
import {FETCH_TASK_LIST_REQUEST} from '../modules/task'

import axios from 'axios'

const apiList = getPayload => ({
  [FETCH_TASK_LIST_REQUEST] : {
    url: 'http://localhost:8000/task/',
    method: 'get',
    selector: data => data
  },
  [FETCH_PROJECT_LIST_REQUEST] : {
    url: 'http://localhost:8000/project',
    method: 'get',
    selector: ({data}) => data
  },
  [CREATE_PROJECT_REQUEST] : {
    url: 'http://localhost:8000/project',
    method: 'post',
    selector: ({data}) => data,
    data: getPayload
  },
  [UPDATE_PROJECT_REQUEST] : {
    url: 'http://localhost:8000/project',
    method: 'put',
    selector: ({data}) => data,
    data: getPayload
  },
  [DELETE_PROJECT_REQUEST] : {
    url: 'http://localhost:8000/project',
    method: 'delete',
    selector: ({data}) => data,
    data: getPayload
  }
})


export const fetchMiddleware = storeApi => next => action => {
  if(action.type.includes('REQUEST')){
    const getApi = apiList(action.payload)[action.type]
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
import {take, put, select} from 'redux-saga/effects'
import {v1 as uuidV1} from 'uuid'
import axios from 'axios'

import * as mutations from './mutations'
import { history } from './history'

const url = "http://localhost:7777"

export function* taskCreationSaga() {
  while(true) {
    const {groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerId = 'U1'
    const taskId = uuidV1();
    yield put(mutations.createTask(taskId, groupID, ownerId))
    
    const { res } = yield axios.post(url + '/task/new/', {
      task: {
        id: taskId,
        group: groupID,
        owner: ownerId,
        isComplete: false,
        name: 'From Client'
      }
    })
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE
    ])

    axios.post(url + '/task/update', {
      task: {
        id: task.taskID,
        group: task.groupID,
        isComplete: task.isComplete,
        name: task.name
      }
    })
  }
} 

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER)
    try {
      console.log(username, password)
      const { data } = yield axios.post(url + '/authenticate', {username, password})
      if(!data) {
        throw new Error()
      }
      console.log('authenticated', data)
      yield put(mutations.setState(data.state))
      yield put(mutations.processAuthenticateUSer(mutations.AUTHENTICATED))

      history.push('/dashboard')
    } catch (e) {
      console.log('cant authenticate')
      yield put(mutations.processAuthenticateUSer(mutations.NOT_AUTHENTICATE))
    }
  }
}
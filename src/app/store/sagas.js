import {take, put, select} from 'redux-saga/effects'
import {v1 as uuidV1} from 'uuid'
import axios from 'axios'

import * as mutations from './mutations'

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
        group: ownerId,
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

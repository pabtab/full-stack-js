import {
  take,
  put,
  select
} from 'redux-saga/effects'
import uuid from 'uuid'
import * as mutations from './mutations'


export function* taskCreationSaga() {
  while(true) {
    const {groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerId = 'U1'
    const taskId = uuid();
    yield put(mutations.createTask(taskId, groupID, ownerId))
    console.log('groupID', groupID)
  }
}

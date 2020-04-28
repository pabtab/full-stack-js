import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { defaultState } from '../../server/defaultState'
import * as sagas from './sagas'
import * as mutations from './mutations'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    session(
      userSession = defaultState.session || {}, 
      {type, authenticated, state}) {

        switch (type) {
          case mutations.SET_STATE:
              return {
                ...userSession,
                id: state.session.id
              }

          case mutations.REQUEST_AUTHENTICATE_USER:
            
            return {
              ...userSession,
              authenticated: mutations.AUTHENTICATING
            }

          case mutations.PROCESSING_AUTHENTICATE_USER:
            return {
              ...userSession,
              authenticated
            }
        
          default:
            return userSession;
        }
    },
    tasks(tasks = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.tasks

        case mutations.CREATE_TASK:
          console.log(action)
          return [
            ...tasks,
            {
              id: action.taskID,
              name: 'New Task',
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false
            }
          ];

        case mutations.SET_TASK_COMPLETE:
          return tasks.map(task => {
            return task.id === action.taskID 
            ? {
              ...task,
              isComplete: action.isComplete
            }
            : task
          })
        
        case mutations.SET_TASK_GROUP:
          return tasks.map(task => {
            return task.id === action.taskID 
            ? {
              ...task,
              group: action.groupID
            }
            : task
          })

        case mutations.SET_TASK_NAME:
          return tasks.map(task => {
            return task.id === action.taskID 
            ? {
              ...task,
              name: action.name
            }
            : task
          })
      

        default:
          return tasks;
      }
    },
    comments(comments = []) {
      return comments
    },
    groups(groups = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.groups
      
        default:
          return groups;
      }
      return groups
    },
    users(users = []) {
      return users
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga])
}
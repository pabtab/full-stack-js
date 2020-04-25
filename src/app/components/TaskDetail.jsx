import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import * as mutations from '../store/mutations'

export const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,

  setTaskCompletion,
  setTaskGroup,
  setTaskName
}) => {
  return (
    <div>
      <div>
        <input type="text" value={task.name} onChange={setTaskName}/>
      </div>
      <h2>{task.name}</h2>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>
          {
            isComplete 
            ? `Reopen`
            : `Complete`
          }
        </button>
      </div>
      <div>
        <select onChange={setTaskGroup} value={task.group}>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>
      <Link to="/dashboard">
        <button>
          Done
        </button>
      </Link>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const task = state.tasks.find(task => task.id === id);
  const groups = state.groups;

  return {
    id,
    task,
    groups,
    isComplete: task.isComplete
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;

  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete))
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value))
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)

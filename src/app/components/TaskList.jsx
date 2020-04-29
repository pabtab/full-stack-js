import React from 'react'
import {connect} from 'react-redux'
import { requestTaskCreation } from '../store/mutations'
import { Link } from 'react-router-dom'

export const TaskList = ({task, name, id, createNewTask}) => {
  return (
    <div className="card p-2 m-2">
      <h3>
        {name}
      </h3>
      <div>
        {
          task.map(task => (
            <Link to={`/task/${task.id}`} key={task.id}>
              <div className="card p-2 mt-2">{task.name}</div>
            </Link>
          ))
        }
      </div>
      <button className="btn btn-primary btn-block mt-2" onClick={() => createNewTask(id)}>Add Task</button>
    </div>
  )
}

const mapStateToPropos = (state, ownProps) => {
  let groupId = ownProps.id;
  return {
    name: ownProps.name,
    id: groupId,
    task: state.tasks.filter(task => task.group === groupId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log('Create', id)
      dispatch(requestTaskCreation(id))
    }
  }
}

export default connect(mapStateToPropos, mapDispatchToProps)(TaskList)

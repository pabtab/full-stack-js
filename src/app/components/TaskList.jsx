import React from 'react'
import {connect} from 'react-redux'

export const TaskList = ({task, name}) => {
  return (
    <div>
      <h3>
        {name}
      </h3>
      <div>
        {
          task.map(task => (
            <div key={task.id}>{task.name}</div>
          ))
        }
      </div>
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

export default connect(mapStateToPropos)(TaskList)

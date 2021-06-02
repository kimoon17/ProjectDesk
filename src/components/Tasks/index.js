import {connect} from 'react-redux'
import {Tasks} from './Tasks'

import {
    updateTask,
    removeTask,
    createNewTask,
    fetchTaskList,
    taskListSelector
} from '../../modules/task'

export default connect(state => ({
    taskList: taskListSelector(state)
}), {fetchTaskList, createNewTask, removeTask, updateTask})(Tasks)
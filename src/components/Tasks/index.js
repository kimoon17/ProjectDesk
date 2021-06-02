import {connect} from 'react-redux'
import {Tasks} from './Tasks'

import {
    updateTask,
    removeTask,
    createNewTask,
    fetchTaskList,
    setActiveTask,
    activeTaskSelector,
    taskListSelector
} from '../../modules/task'

export default connect(state => ({
    taskList: taskListSelector(state),
    activeTask: activeTaskSelector(state),
}), {fetchTaskList, createNewTask, removeTask, setActiveTask, updateTask})(Tasks)
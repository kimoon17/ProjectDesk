import {connect} from 'react-redux'
import Tasks from './Tasks'

import {
    fetchTaskStatuses,
    fetchTaskTypes,
    typeListSelector,
    statusListSelector,
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
    typeList: typeListSelector(state),
    statusList: statusListSelector(state),
}), {fetchTaskList, createNewTask, removeTask, setActiveTask, updateTask, fetchTaskStatuses, fetchTaskTypes})(Tasks)
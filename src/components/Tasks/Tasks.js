import '../Projects/styles.scss'
import {useEffect, useState} from 'react'
import {batch} from 'react-redux'
import Modal from '../Modal'
import {Field, Form, Formik} from 'formik'
import {useParams} from 'react-router-dom'

const statusColors = {
    'Backlog': 'blue',
    'In the sprint': 'orange',
    'Active': 'red',
    'Done': 'lightblue',
    'Abandoned': 'brown'
}

const TaskForm = ({task, handleSubmit}) => {
    return (
        <div className="form__container">
            <Formik
                initialValues={{...task}}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                <Form>
                    <label htmlFor="name">Name</label>
                    <Field className="options-box name" id="name" name="name" />

                    <label className="label-box" htmlFor="status">Status</label>
                    <Field as="select" name="status" className="options-box rounded">
                        <option value="1">Backlog</option>
                        <option value="2">In the sprint</option>
                        <option value="3">Active</option>
                        <option value="4">Done</option>
                        <option value="5">Abandoned</option>
                    </Field>

                    <label className="label-box" htmlFor="type">Type</label>
                    <Field as="select" name="type" className="options-box rounded">
                        <option value="1">Feature</option>
                        <option value="2">Bug</option>
                        <option value="3">Test</option>
                    </Field>

                    <label className="label-box" htmlFor="Description">Description</label>
                    <Field className="options-box" id="description" name="description" as="textarea" />

                    <button id="myBtn" className="options-box" type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

function Tasks({statusList = [], typeList = [], taskList, fetchTaskList, createNewTask, removeTask, setActiveTask, activeTask, updateTask, fetchTaskStatuses, fetchTaskTypes}) {

    const {project_id} = useParams()

    useEffect(() => {
        batch(() => {
            fetchTaskStatuses()
            fetchTaskTypes()
            fetchTaskList(project_id || null)
        })
    }, [fetchTaskStatuses, fetchTaskTypes, fetchTaskList, project_id])

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div className="project_boxes">
                {taskList && taskList.map((task) => <div className="project_box" key={task.id}>
                    <p style={{backgroundColor: statusColors[statusList[task.status]]}} className="highlight">{statusList[task.status]}</p>
                    <p>{typeList[task.status]}</p>
                    <p className="project_code">{task.name}</p>
                    <p>{task.description}</p>
                    <span onClick={() => removeTask(task.id)}>X</span>
                    <div onClick={() => setActiveTask(task)} className="project_task_box">More</div>
                </div>)}
            </div>

            {project_id && <div className="button_box">
                <button className="project_add" onClick={() => setIsOpen(true)}>+ add</button>
            </div>}

            {activeTask && activeTask.id && <Modal onClose={() => setActiveTask(null)} title={activeTask.name}>
                <TaskForm
                    task={activeTask}
                    handleSubmit={(values) => {
                        updateTask(values)
                        setActiveTask(null)
                    }}
                />
            </Modal>}

            {!activeTask && isOpen && <Modal onClose={() => setIsOpen(false)} title="New Task">
                <TaskForm
                    handleSubmit={(values) => {
                        createNewTask(values)
                        setIsOpen(false)
                    }}
                    task={{project_id: project_id, name: '', status: 1, description: '', type: 1}}
                />
            </Modal>}
        </div>
    )
}

export default Tasks

import '../Projects/styles.scss'
import {useEffect, useState} from 'react'
import {batch} from 'react-redux'
import Modal from '../Modal'
import {Field, Form, Formik} from 'formik'
import {useParams} from 'react-router-dom'
import {getCurrentItemById} from '../../utils'
import {AiOutlineStar, AiOutlineBug} from 'react-icons/ai'
import {GrTest} from 'react-icons/gr'
import * as ai from 'react-icons/ai'
import * as gr from 'react-icons/gr'
const icon = Object.assign(ai, gr)

const TaskForm = ({task, handleSubmit, statusList, typeList}) => {
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
                        {statusList.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
                    </Field>

                    <label className="label-box" htmlFor="type">Type</label>
                    <Field as="select" name="type" className="options-box rounded">
                        {typeList.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </Field>

                    <label className="label-box" htmlFor="Description">Description</label>
                    <Field className="options-box" id="description" name="description" as="textarea" />

                    <button id="myBtn" className="options-box" type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

function Tasks({statusList = [], typeList, taskList, fetchTaskList, createNewTask, removeTask, setActiveTask, activeTask, updateTask, fetchTaskStatuses, fetchTaskTypes}) {

    const {project_id} = useParams()

    useEffect(() => {
        batch(() => {
            fetchTaskStatuses()
            fetchTaskTypes()
            fetchTaskList(project_id || null, 1, 0)
        })
    }, [fetchTaskStatuses, fetchTaskTypes, fetchTaskList, project_id])

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div className="project_boxes">
                {taskList && taskList.map((task) => {
                    const TypeIcon = icon[getCurrentItemById(typeList, task.type).icon]
                    return <div className="project_box" key={task.id}>
                    <p style={{color: 'white', backgroundColor: getCurrentItemById(statusList, task.status).color}} className="highlight">
                        {getCurrentItemById(statusList, task.status).name}
                    </p>
                    <div className="project-text">
                        {typeList && <TypeIcon />}
                    </div>
                    <p className="project_code">{task.name}</p>
                    <p>{task.description}</p>
                    <span onClick={() => removeTask(task.id)}>X</span>
                    <div onClick={() => setActiveTask(task)} className="project_task_box">More</div>
                </div> } )}
            </div>

            {project_id && <div className="button_box">
                <button className="project_add" onClick={() => setIsOpen(true)}>+ add</button>
            </div>}

            {activeTask && activeTask.id && <Modal onClose={() => setActiveTask(null)} title={activeTask.name}>
                <TaskForm
                    task={activeTask}
                    statusList={statusList}
                    typeList={typeList}
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
                    statusList={statusList}
                    typeList={typeList}
                    task={{project_id: project_id, name: '', status: 1, description: '', type: 1}}
                />
            </Modal>}
        </div>
    )
}

export default Tasks

import '../Projects/styles.scss'
import {useEffect, useState} from 'react'
import Modal from '../Modal'
import {Field, Form, Formik} from 'formik'

//create:
//name, status, type, description, project_id

const TaskForm = ({task, handleSubmit}) => {
    return (
        <div className="task__container">
            <Formik
                initialValues={{...task}}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
                >
                <Form>
                    <label htmlFor="name">Task name</label>
                    <Field id="name" name="name" placeholder="name"/>

                    <label htmlFor="status">Task status</label>
                    <field id="status" name="status" placeholder="status"/>

                    <label htmlFor="type">Task type</label>
                    <field id="type" name="type" placeholder="type"/>

                    <label htmlFor="description">Task status</label>
                    <field id="description" name="description" placeholder="description"/>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export function Tasks({taskList, fetchTaskList, createNewTask, removeTask, setActiveTask, activeTask, updateTask}) {

    useEffect(() => {
        fetchTaskList()
    }, [fetchTaskList])

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div className="project_boxes">
                {taskList && taskList.map((task) => <div className="project_box" key={task.id}>
                    <p className="project_code">{task.code}</p>
                    <p>{task.status}</p>
                    <p>{task.type}</p>
                    <p>{task.description}</p>
                    <span onClick={() => removeTask(task.id)}>X</span>
                    <div className="project_task_box">More</div>
                </div>)}
            </div>

            <div className="button_box">
                <button className="project_add" onClick={() => setIsOpen(true)}>+ add</button>
            </div>

            {activeTask && activeTask.id && <Modal onClose={() => setActiveTask(null)} title={activeTask.name}>
                <TaskForm
                    task={activeTask}
                    handleSubmit={(values) => {
                        updateTask(values)
                        setActiveTask(null)
                    }}
                    />
            </Modal> }

            {!activeTask && isOpen && <Modal onClose={() => setIsOpen(false)} title="New Task">
                <TaskForm
                    handleSubmit{(values) => {
                        createNewTask(values)
                        setIsOpen(false)
                }}
                    task={{name: '', code: ''}}
                    />
            </Modal> }
        </div>
    )
}
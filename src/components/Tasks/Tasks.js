import '../Projects/styles.scss'
import {useEffect, useState} from 'react'
import Modal from '../Modal'
import {Field, Form, Formik} from 'formik'
import {useParams} from 'react-router-dom'

//create:
//name, status, type, description, project_id

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
          <label htmlFor="name">Task name</label>
          <Field id="name" name="name" placeholder="name"/>

          <label htmlFor="status">Task status</label>
          <Field as="select" name="status">
            <option value="1">Backlog</option>
            <option value="2">In the sprint</option>
            <option value="3">Active</option>
            <option value="4">Done</option>
            <option value="5">Abandoned</option>
          </Field>

          <label htmlFor="type">Task type</label>
          <Field as="select" name="type">
            <option value="1">Feature</option>
            <option value="2">Bug</option>
            <option value="3">Test</option>
          </Field>

          <label htmlFor="description">Task status</label>
          <Field id="description" name="description" as="textarea" placeholder="description"/>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

function Tasks({taskList, fetchTaskList, createNewTask, removeTask, setActiveTask, activeTask, updateTask}) {

  useEffect(() => {
    fetchTaskList()
  }, [fetchTaskList])

  const {project_id} = useParams()

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
          task={{project_id: project_id, name: '', status: '', description: '', type: ''}}
        />
      </Modal>}
    </div>
  )
}

export default Tasks
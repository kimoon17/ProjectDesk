import {useEffect, useState} from 'react'
import './styles.scss'
import Modal from '../Modal'
import {Field, Form, Formik} from 'formik'


const ProjectForm = ({project, handleSubmit}) => {
  return (
    <div className="form__container">
      <Formik
        initialValues={{...project}}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      >
        <Form>
          <label htmlFor="name">Project Name</label>
          <Field id="name" name="name" placeholder="name"/>

          <label htmlFor="code">Project code</label>
          <Field id="code" name="code" placeholder="code"/>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}


export function Projects({projectList, fetchProjectList, createNewProject, removeProject, setActiveProject, activeProject, updateProject}) {

  useEffect(() => {
    fetchProjectList()
  }, [fetchProjectList])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="project_boxes">
        {projectList && projectList.map((project) => <div className="project_box" key={project.id}>
          <p className="project_name" onClick={() => setActiveProject(project.id)}>{project.name}</p>
          <p className="project_code">{project.code}</p>
          <span onClick={() => removeProject(project.id)}>X</span>
          <div className="project_task_box">Tasks</div>
        </div>)}
      </div>
      <div className="button_box">
        <button className="project_add" onClick={() => setIsOpen(true)}>+ add</button>
      </div>
      {activeProject && activeProject.id && <Modal onClose={() => setActiveProject(null)} title={activeProject.name}>
        <ProjectForm
          project={activeProject}
          handleSubmit={(values) => {
            updateProject(values)
            setActiveProject(null)
          }}
        />
      </Modal>}

      {!activeProject && isOpen && <Modal onClose={() => setIsOpen(false)} title="New Project">
        <ProjectForm
          handleSubmit={(values) => {
            createNewProject(values)
            setIsOpen(false)
          }}
          project={{name: '', code: ''}}
        />
      </Modal>}
    </div>
  )
}
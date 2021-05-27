import {useEffect} from 'react'
import './styles.scss';

export function Projects({projectList, fetchProjectList, createNewProject, removeProject}) {

  useEffect(() => {
    fetchProjectList()
  }, [fetchProjectList])

  return (
    <div>
      <div className="project_boxes">
          {projectList && projectList.map((project) => <div className="project_box" key={project.id}>
            <p className="project_name">{project.name}</p>
              <p className="project_code">{project.code}</p>
                <span onClick={() => removeProject(project.id)}>X</span>
              <div className="project_task_box">Tasks</div>
        </div>)}
      </div>
        <div className="button_box">
            <button className="project_add" onClick={() => {
              createNewProject({name: 'new client project', code: 'FFF'})
            }}>+ add</button>
        </div>
    </div>
  )
}
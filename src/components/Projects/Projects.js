import {useEffect} from 'react'
import './styles.scss';

export function Projects({projectList, fetchProjectList}) {

  useEffect(() => {
    fetchProjectList()
  }, [fetchProjectList])

  return (
    <div>
      <h1 className="project_heading">Projects</h1>
      <div className="project_boxes">
          {projectList && projectList.map((project) => <div className="project_box" key={project.id}>
            <p className="project_name">{project.name}</p>
              <p className="project_code">{project.code}</p>
              <div className="project_task_box">Tasks</div>
        </div>)}
      </div>
        <div className="button_box">
            <button className="project_add">+ add</button>
        </div>
    </div>
  )
}
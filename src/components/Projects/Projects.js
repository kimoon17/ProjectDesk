import {useEffect} from 'react'

export function Projects({projectList, fetchProjectList}) {

  useEffect(() => {
    fetchProjectList()
  }, [fetchProjectList])

  return (
    <div>
      <h1>Projects</h1>
      {projectList && projectList.map((project) => <div key={project.id}>
        {project.name}
      </div>)}
    </div>
  )
}
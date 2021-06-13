import { connect } from 'react-redux'
import {Projects} from './Projects'

import {
  updateProject,
  removeProject,
  createNewProject,
  fetchProjectList,
  setActiveProject,
  activeProjectSelector,
  errorProjectSelector,
  projectListSelector
} from '../../modules/project'

export default connect(state => ({
  errorProject: errorProjectSelector(state),
  projectList: projectListSelector(state),
  activeProject: activeProjectSelector(state),
}), {fetchProjectList, createNewProject, removeProject, setActiveProject, updateProject})(Projects)
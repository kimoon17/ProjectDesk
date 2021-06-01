import { connect } from 'react-redux'
import {Projects} from './Projects'

import {
  updateProject,
  removeProject,
  createNewProject,
  fetchProjectList,
  setActiveProject,
  activeProjectSelector,
  projectListSelector
} from '../../modules/project'

export default connect(state => ({
  projectList: projectListSelector(state),
  activeProject: activeProjectSelector(state),
}), {fetchProjectList, createNewProject, removeProject, setActiveProject, updateProject})(Projects)
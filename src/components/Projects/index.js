import { connect } from 'react-redux'
import {Projects} from './Projects'

import {
  removeProject,
  createNewProject,
  fetchProjectList,
  projectListSelector
} from '../../modules/project'

export default connect(state => ({
  projectList: projectListSelector(state)
}), {fetchProjectList, createNewProject, removeProject})(Projects)
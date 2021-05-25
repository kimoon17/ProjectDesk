import { connect } from 'react-redux'
import {Projects} from './Projects'

import {
  fetchProjectList,
  projectListSelector
} from '../../modules/project'

export default connect(state => ({
  projectList: projectListSelector(state)
}), {fetchProjectList})(Projects)
const {createProject, readProjects, updateProject, deleteProject} = require('../models/projects')

const project_create = async (req, res) => {
  const {body: {name, code}} = req
  const newProject = createProject(name, code)
  res.status(200).send(newProject);
}

const project_list = async (req, res) => {
  const {query: {limit, offset}} = req
  const projectRead = await readProjects(limit, offset);
  res.status(200).send(projectRead);
}

const project_update = async(req, res) => {
  const {body: {id, name, code}} = req
  const changedProject = await updateProject(name, code, id);
  res.status(200).send(changedProject);
}

const project_delete = async(req, res) => {
  const {body: {id}} = req
  const deletedProject = await deleteProject(id);
  res.status(200).send(deletedProject);
}

module.exports = {
  project_create,
  project_list,
  project_update,
  project_delete
}
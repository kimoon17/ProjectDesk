const {createProject, readProjects, updateProject, deleteProject, deleteTasksByProject} = require('../models/projects')

const project_create = async (req, res) => {
  const {body: {name, code}} = req
  console.log(name, code)
  const {status} = await createProject(name, code)
  const {data} = await readProjects()
  res.status(status).send(data);
}

const project_list = async (req, res) => {
  const {query: {limit, offset}} = req
  const {status, data} = await readProjects(limit, offset);
  res.status(status).send(data);
}

const project_update = async(req, res) => {
  const {body: {id, name, code}} = req
  const {status} =  await updateProject(name, code, id);
  const {data} = await readProjects()
  res.status(status).send(data);
}

const project_delete = async(req, res) => {
  const {body: {id}} = req
  await deleteTasksByProject(id);
  const {status} = await deleteProject(id);
  const {data} = await readProjects()
  res.status(status).send(data);
}

module.exports = {
  project_create,
  project_list,
  project_update,
  project_delete
}
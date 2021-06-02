const connect = require('../database');
const myConnect = connect
const {listFormatter} = require('../formatters/projects')

const sqlCreateProject = {
  text: `INSERT INTO projectdeskdb.projects (name, code) VALUES ($1, $2)
    RETURNING id, name, code`
}

const sqlProjectById = {
  text: `SELECT * FROM projectdeskdb.projects WHERE id=$1`
}

const sqlProjectByCode = {
  text: `SELECT * FROM projectdeskdb.projects WHERE code=$1`
}

const sqlProjectList = {
  text: `SELECT * FROM projectdeskdb.projects LIMIT $1 OFFSET $2`
}

const sqlUpdateProjects = {
  text: `UPDATE projectdeskdb.projects SET name=$1, code=$2 WHERE id=$3
    RETURNING id, name, code`
}

const sqlDeleteProject = {
  text: `DELETE FROM projectdeskdb.projects WHERE id=$1`
}

const readOneProject = async (id) => ({status : 200, data: await myConnect.query(sqlProjectById, [id])})

const readOneProjectByCode = async (code) => ({status : 200, data: await myConnect.query(sqlProjectByCode, [code])})

const createProject = async (name, code) => {
  const {data : {rows}} = await readOneProjectByCode(code)

  if(rows.length){
    return {status: 400, data: 'project code already exist'}
  }
  const newProject = await myConnect.query(sqlCreateProject, [name, code])
  return {status: 200, data: newProject.rows[0]}
}

//await awaits a promise
const readProjects = async (limit, offset) => ({status: 200, data: listFormatter(await myConnect.query(sqlProjectList, [limit, offset]))})

const updateProject = async (name, code, id) => {
  const {data : {rows}} = await readOneProject(id)
  if(rows.length === 0){
    return {status: 400, data: 'project id is missing'}
  }
  return {status: 200, data: await myConnect.query(sqlUpdateProjects, [name, code, id])}
}

const deleteProject = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteProject, [id])})



module.exports = {
  createProject,
  readProjects,
  updateProject,
  readOneProject,
  deleteProject
}
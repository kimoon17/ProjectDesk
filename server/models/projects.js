const connect = require('../database');
const myConnect = connect

const sqlCreateProject = {
  text: `INSERT INTO projectdeskdb.projects VALUES ($1, $2)
    RETURNING id, name, code`
}

const sqlProjects = {
  text: `SELECT * FROM projectdeskdb.projects LIMIT $1 OFFSET $2`
}

const sqlUpdateProjects = {
  text: `UPDATE projectdeskdb.projects SET name=$1, code=$2 WHERE id=$3
    RETURNING id, name, code`
}

const sqlDeleteProject = {
  text: `DELETE FROM projectdeskdb.projects WHERE id=$1
    RETURNING id, name, code`
}

const createProject = (name, code) => {
  myConnect.query(sqlCreateProject, [name, code])
}
const readProjects = (limit, offset) => myConnect.query(sqlProjects, [limit, offset])
const updateProject = (id, name, code) => myConnect.query(sqlUpdateProjects, [name, code, id])
const deleteProject = (id) => myConnect.query(sqlDeleteProject, [id])


module.exports = {
  createProject,
  readProjects,
  updateProject,
  deleteProject
}
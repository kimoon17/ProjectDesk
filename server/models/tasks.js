const connect = require('../database')
const myConnect = connect
const {listFormatter} = require('../formatters/projects')

const sqlCreateTask = {
    text: `INSERT INTO projectdeskdb.tasks (name, status, type, description, project_id) VALUES ($1, $2, $3, $4, $5)
    RETURNING name, status, type, description, project_id` //project id ->>> projects
}

const sqlTasksByProject = {
    text: `SELECT * FROM projectdeskdb.tasks where project_id=$1 LIMIT $2 OFFSET $3`
}

const sqlTaskList = {
    text: `SELECT * FROM projectdeskdb.tasks ORDER BY id DESC LIMIT $1 OFFSET $2 `
}

const sqlCountRows = {
    text: `SELECT COUNT(*) FROM projectdeskdb.tasks`
}

const sqlCountRowsByProjectId = {
    text: `SELECT COUNT(*) FROM projectdeskdb.tasks WHERE project_id = $1`
}

const sqlUpdateTasks = {
    text: `UPDATE projectdeskdb.tasks SET name=$1, status=$2, type=$3, description=$4 WHERE id=$5`
}

const sqlDeleteTask = {
    text: `DELETE FROM projectdeskdb.tasks WHERE id=$1`
}

const sqlTaskById = {
    text: `SELECT * FROM projectdeskdb.tasks WHERE id=$1 ORDER BY id DESC`
}

const sqlTaskStatus = {
    text: `SELECT * FROM projectdeskdb.status`
}

const sqlTaskType = {
    text: `SELECT * FROM projectdeskdb.type`
}

//project's tasks
const readTasksByProject = async (project_id, limit, offset) => {
    const {rows} = await myConnect.query(sqlCountRowsByProjectId, [project_id])
    return ({statusCode: 200, data: listFormatter(await myConnect.query(sqlTasksByProject, [project_id, limit, offset]), rows)})
}

//specific
const readTaskById = async (id) => {
    const {rows} = await myConnect.query(sqlCountRows)
    return ({statusCode: 200, data: listFormatter(await myConnect.query(sqlTaskById, [id]), rows)})
}

const createTask = async (name, status, type, description, project_id) => {
    const {rows} = await myConnect.query(sqlCountRows)
    return {statusCode: 200, data: listFormatter(await myConnect.query(sqlCreateTask, [name, status, type, description, project_id]), rows)}
}

//all
const readTasks = async (limit, offset) => {
    const {rows} = await myConnect.query(sqlCountRows)

    return ({statusCode: 200, data: listFormatter(await myConnect.query(sqlTaskList, [limit, offset]), rows)})
}

const updateTask = async (id, name, status, type, description) => {
    return {statusCode: 200, data: await myConnect.query(sqlUpdateTasks, [name, status, type, description, id])}
}

const deleteTask = async (id) => ({statusCode: 200, data: await myConnect.query(sqlDeleteTask, [id])})

const readTaskStatus = async () => ({statusCode: 200, data: await myConnect.query(sqlTaskStatus)})

const readTaskType = async () => ({statusCode: 200, data: await myConnect.query(sqlTaskType)})

module.exports = {
    readTasksByProject,
    createTask,
    readTasks,
    updateTask,
    readTaskById,
    deleteTask,
    readTaskStatus,
    readTaskType
}
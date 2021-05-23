const connect = require('../database')
const myConnect = connect

const sqlCreateTask = {
    text: `INSERT INTO projectdeskdb.tasks (name, status, type, description) VALUES ($1, $2, $3, $4)
    RETURNING name, status, type, description`
}

const sqlTaskByType = {
    text: `SELECT * FROM projectdeskdb.tasks where type=$1`
}

const sqlTaskList = {
    text: `SELECT * FROM projectdeskdb.tasks LIMIT $1 OFFSET $2`
}

const sqlUpdateTasks = {
    text: `UPDATE projectdeskdb.tasks SET name=$1, status=$2, type=$3, description=$4 WHERE id=$5
    RETURNING id, name, status`
}

const sqlDeleteTask = {
    text: `DELETE FROM projectdeskdb.tasks WHERE id=$1`
}

const readOneTask = async (type) => ({status: 200, data: await myConnect.query(sqlTaskByType, [type])})

const createTask = async (name, status, type, description) => {
    const {data: {rows}} = await readOneTask(type)

    if (rows.length) {
        return {status: 400, data: 'task type already exists'}
    }

    return {status: 200, data: await myConnect.query(sqlCreateTask, [name, status, type, description])}
}

const readTasks = async (limit, offset) => ({status: 200, data: await myConnect.query(sqlTaskList, [limit, offset])})

const updateTask = async (id, name, status, type, description) => {
    const {data: {rows}} = await readOneTask(type)
    if (rows.length === 0) {
        return {status: 400, data: 'task id is missing'}
    }
    return {status: 200, data: await myConnect.query(sqlUpdateTasks, [name, status, type, description, id])}
}

const deleteTask = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteTask, [id])})

module.exports = {
    createTask,
    readTasks,
    updateTask,
    readOneTask,
    deleteTask
}
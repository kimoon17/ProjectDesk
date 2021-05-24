const {readTasksByProject, createTask, readTasks, updateTask, deleteTask} = require('../models/tasks')

const task_create = async (req, res) => {
    const {body: {name, status, type, description, project_id}} = req
    const {statusCode, data} = await createTask(name, status, type, description, project_id)
    res.status(statusCode).send(data)
}

const task_list = async (req, res) => {
    const {query: {limit, offset}} = req
    const {statusCode, data} = await readTasks(limit, offset)
    res.status(statusCode).send(data);
}

const task_update = async (req, res) => {
    const {body: {id, name, status, type, description}} = req
    const {statusCode, data} = await updateTask(id, name, status, type, description);
    res.status(statusCode).send(data);
}

const task_delete = async (req, res) => {
    const {body: {id}} = req
    const {statusCode, data} = await deleteTask(id);
    res.status(statusCode).send(data)
}

const task_list_by_project = async (req, res) => {
    const {query: {limit, offset}, params: {project_id}} = req
    const {statusCode, data} = await readTasksByProject(project_id, limit, offset)
    res.status(statusCode).send(data);
}

module.exports = {
    task_create,
    task_list,
    task_update,
    task_delete,
    task_list_by_project
}
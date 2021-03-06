const {readTasksByProject, createTask, readTasks, updateTask, deleteTask, readTaskStatus, readTaskType} = require('../models/tasks')
const {listFormatter} = require('../formatters/projects')

const task_create = async (req, res) => {
    const {body: {name, status, type, description, project_id}} = req
    await createTask(name, status, type, description, project_id)
    const {statusCode, data} = await readTasksByProject(project_id)
    res.status(statusCode).send(data)
}

const task_list = async (req, res) => {
    const {query: {limit, offset}} = req
    const {statusCode, data} = await readTasks(limit, offset)
    res.status(statusCode).send(data);
}

const task_update = async (req, res) => {
    const {body: {id, name, status, type, description}} = req
    const {statusCode} = await updateTask(id, name, status, type, description);
    const {data} = await readTasks()
    res.status(statusCode).send(data);
}

const task_delete = async (req, res) => {
    const {body: {id}} = req
    const {statusCode} = await deleteTask(id);
    const {data} = await readTasks()
    res.status(statusCode).send(data)
}

const task_list_by_project = async (req, res) => {
    const {query: {limit, offset}, params: {project_id}} = req
    const {statusCode, data} = await readTasksByProject(project_id, limit, offset)
    res.status(statusCode).send(data);
}

const task_status = async (req, res) => {
    const {statusCode, data: {rows}} = await readTaskStatus();
    res.status(statusCode).send(rows)
}

const task_type = async (req, res) => {
    const {statusCode, data: {rows}} = await readTaskType();
    res.status(statusCode).send(rows)
}

module.exports = {
    task_create,
    task_list,
    task_update,
    task_delete,
    task_list_by_project,
    task_status,
    task_type
}
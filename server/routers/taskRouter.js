const express = require('express')
const router = express.Router()
const {task_create, task_list, task_update, task_delete, task_list_by_project, task_status, task_type} = require('../controllers/taskController.js')

router.post('/', task_create)

router.get('/', task_list)
router.get('/:project_id', task_list_by_project)

router.get('/status', task_status)
router.get('/type', task_type)

router.put('/', task_update)
router.delete('/', task_delete)

module.exports = router
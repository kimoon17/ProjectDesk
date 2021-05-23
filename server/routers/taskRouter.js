const express = require('express')
const router = express.Router()
const {task_create, task_list, task_update, task_delete} = require('../controllers/taskController.js')

router.post('/tasks/', task_create)
router.get('/tasks/', task_list)
router.put('/tasks/', task_update)
router.delete('/tasks/', task_delete)

module.exports = router
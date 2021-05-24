const express = require('express')
const router = express.Router()
const {task_create, task_list, task_update, task_delete} = require('../controllers/taskController.js')

router.post('/', task_create)
router.get('/', task_list)
router.put('/', task_update)
router.delete('/', task_delete)

module.exports = router
const express = require('express')
const router = express.Router()
const {project_create, project_list, project_update, project_delete} = require('../controllers/projectController')

//CREATE endpoint

router.post('/', project_create)
router.get('/', project_list)
router.put('/', project_update)
router.delete('/', project_delete)

module.exports = router
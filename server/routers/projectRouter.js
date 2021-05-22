const express = require('express')
const router = express.Router()
const connect = require('../database');
const myConnect = connect
const {sqlCreateProject, sqlProjects, sqlUpdateProjects, sqlDeleteProject} = require('../dbQueries')

//CREATE endpoint

router.post('/', async (req, res) => {
  const {body: {name, code}} = req
  const newProject = await myConnect.query(sqlCreateProject, [name, code])
  res.status(200).send(newProject);
})

router.get('/', async (req, res) => {
  const {query: {limit, offset}} = req
  const projectRead = await myConnect.query(sqlProjects, [limit, offset]);
  res.status(200).send(projectRead);
})

router.put('/', async(req, res) => {
  const {body: {id, name, code}} = req
  const changedProject = await myConnect.query(sqlUpdateProjects, [name, code, id]);
  res.status(200).send(changedProject);
})

router.delete('/', async(req, res) => {
  const {body: {id}} = req
  const deletedProject = await myConnect.query(sqlDeleteProject, [id]);
  res.status(200).send(deletedProject);
})

module.exports = router
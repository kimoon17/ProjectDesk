const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connect = require('./database');
const myConnect = connect
const {sqlCreateProject} = require('./pgQueries')

const app = express();

app.listen(8000, () => {
    console.log("Server is working!!!");
})

app.use(bodyParser.json()); //json format
app.use(cors({origin: "http://localhost:3000"}));

//CREATE endpoint
app.post('/project/create', async (req, res) => {
    const newProject = await myConnect.query(sqlCreateProject)
})

app.post('project/read', async (req, res) => {
    const projectRead = await myConnect.query(sqlProjects)
})

app.post('project/update', async(req, res) => {
    /*const projectUpdate = await myConnect.query()*/
})

app.post('project/delete', async(req, res) => {
    /*const projectDelete = await myConnect.quer()*/
})


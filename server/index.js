const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connect = require('./database');
const myConnect = connect
const {sqlCreateProject, sqlProjects, sqlUpdateProjects} = require('./dbQueries')

const app = express();

app.listen(8000, () => {
    console.log("Server is working!!!");
})

//send data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.json()); //json format
app.use(cors({origin: "http://localhost:3000"}));

//CREATE endpoint

app.post('/project/', async (req, res) => {
    const {body: {name, code}} = req
    const newProject = await myConnect.query(sqlCreateProject, [name, code])
    res.status(200).send(newProject);
})

app.get('/project/', async (req, res) => {
    const {query: {limit, offset}} = req
    const projectRead = await myConnect.query(sqlProjects, [limit, offset]);
    res.status(200).send(projectRead);
})

app.put('/project/', async(req, res) => {
    const {body: {id, name, code}} = req
    const changedProject = await myConnect.query(sqlUpdateProjects, [name, code, id]);
    res.status(200).send(changedProject);
})

app.delete('/project/', async(req, res) => {

})


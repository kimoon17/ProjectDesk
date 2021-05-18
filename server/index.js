const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//connect db
const {Client} = require('pg');
const myClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'crud',
    password: 'blablabla5',
    port: 5432
});
myClient.connect();

const app = express();
app.listen(8000, () => {
    console.log("Server is working!!!");
})

app.use(bodyParser.json()); //json format
app.use(cors({origin: "http://localhost:3000"}));

//CREATE endpoint
app.post('/project/create', async (req, res) => {
    const newProject = await myClient.query("")
})


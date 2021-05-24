const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const projectRouters = require('./routers/projectRouter')
const taskRouters = require('./routers/taskRouter')

//send data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.json()); //json format
app.use(cors({origin: "http://localhost:3000"}));

app.use('/project', projectRouters)
app.use('/task', taskRouters)

app.listen(8000, () => {
    console.log("Server is working!!!");
})
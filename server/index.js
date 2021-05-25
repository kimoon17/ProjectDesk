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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Redirect, Authorization")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
    next()
})
app.use('/project', projectRouters)
app.use('/task', taskRouters)

app.listen(8000, () => {
    console.log("Server is working!!!");
})
const {Client} = require('pg');
const {pgSettings} = require('./constants');

const connect = () => {
    const myClient = new Client(pgSettings);
    myClient.connect();
    return myClient
}

module.exports = connect()
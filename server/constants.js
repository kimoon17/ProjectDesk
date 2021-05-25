require('dotenv').config();

module.exports = constants = {
    pgSettings: {
        user: 'postgres',
        host: 'localhost',
        database: 'crud',
        password: 'blablabla5',
        port: 5432
    },
    origin: 'http://localhost:3000',
    port: 8000
}
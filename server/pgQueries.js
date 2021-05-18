const sqlCreateProject = {
    text: `INSERT INTO projects (name, code) values ($1, $2)
    RETURNING id, name, code`
}

const sqlProjects = {
    text: `SELECT * FROM projects`,
    rowMode: 'array',
}

module.exports = {
    sqlCreateProject,
    sqlProjects
}
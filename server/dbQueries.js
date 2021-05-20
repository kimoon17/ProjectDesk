const sqlCreateProject = {
    text: `INSERT INTO projectdeskdb.projects VALUES ($1, $2)
    RETURNING id, name, code`
}

const sqlProjects = {
    text: `SELECT * FROM projectdeskdb.projects LIMIT $1 OFFSET $2`
}

const sqlUpdateProjects = {
    text: `UPDATE projectdeskdb.projects SET name=$1, code=$2 WHERE id=$3
    RETURNING id, name, code`
}

const sqlDeleteProject = {
    text: `DELETE FROM projectdeskdb.projects WHERE id=$1
    RETURNING id, name, code`
}

module.exports = {
    sqlCreateProject,
    sqlProjects,
    sqlUpdateProjects,
    sqlDeleteProject
}
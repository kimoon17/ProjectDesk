const projectListFormatter = (data) => ({
  count : data.rowCount,
  projects: data.rows,
  fields: data.fields
})

module.exports = { projectListFormatter}
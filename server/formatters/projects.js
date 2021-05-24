const listFormatter = (data) => ({
  count : data.rowCount,
  data: data.rows,
  fields: data.fields
})

module.exports = { listFormatter }
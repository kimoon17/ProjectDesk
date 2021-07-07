const listFormatter = (data, count) => {
  return ({
    count : count ? Number(count[0].count) : data.rows.length,
    data: data.rows,
    fields: data.fields
  })
}

module.exports = { listFormatter }
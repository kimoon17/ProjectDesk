export const getCurrentItemById = (list = [], id) => list && list.find(item => item.id === Number(id)) || {}

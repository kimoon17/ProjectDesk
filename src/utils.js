export const getCurrentItemById = (list = [], id) => list.find(item => item.id === Number(id)) || {}

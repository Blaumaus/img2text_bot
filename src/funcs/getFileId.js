const getId = (msg, type) => {
  switch(type) {
    case 'photo': return msg[type][msg.photo.length - 1].file_id
    case 'document': return msg[type].file_id
    default: return false
  }
}

module.exports = getId
const connection = require('../db-config')

// const Joi = require('joi')

const db = connection.promise()

// Validate Data
// const validate = (data, forCreation = true) => {
//   const presence = forCreation ? 'required' : 'optional'
//   return Joi.object({
//     member_name: Joi.string().max(254).presence(presence),
//     url_photo: Joi.string().max(255).presence(presence)
//   }).validate(data, { abortEarly: false }).error
// }

// Get member team
const getInfo = () => {
  let sql = 'SELECT * FROM member'
  return db.query(sql).then(([results]) => console.log(results) || results)
}

const findOne = member_id => {
  return db
    .query('SELECT * FROM member WHERE member_id = ?', [member_id])
    .then(([results]) => results[0])
}

const findOneWithName = name => {
  return db
    .query('SELECT * FROM member WHERE member_name LIKE ?', [name])
    .then(([results]) => results[0])
}

const create = (member_img, member_name, member_role) => {
  console.log(member_img, member_name, member_role)
  return db
    .query(
      'INSERT INTO member (member_img, member_name, member_role) VALUES (?, ?, ?)',
      [member_img, member_name, member_role]
    )
    .then(([results]) => {
      const member_id = results.insertId
      return { member_id, member_img, member_name, member_role }
    })
}

const update = (member_id, newAttributes) => {
  return db.query('UPDATE member SET ? WHERE member_id = ?', [
    newAttributes,
    member_id
  ])
}

const destroy = id => {
  return db
    .query('DELETE FROM member WHERE member_id = ?', [member_id])
    .then(([result]) => result.affectedRows !== 0)
}

module.exports = {
  getInfo,
  // validate,
  findOne,
  findOneWithName,
  create,
  update,
  destroy
}

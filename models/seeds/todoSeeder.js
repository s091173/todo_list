const bcrypt = require('bcryptjs')

// 判斷應用程式執行模式
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 載入 Todo Model
const Todo = require('../todo')
// 載入 User Model
const User = require('../user')
const db = require('../../config/mongoose')
const { create } = require('../todo')

// 第一個使用者
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Todo.create({ name: `name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
// 載入 mongoose
const mongoose = require('mongoose')

// 如果在 Heroku 環境則使用 process.env.MONGODB_URI
// 本地環境，使用 mongodb://localhost/todo-list (放入環境變數中)
const MONGODB_URI = process.env.MONGODB_URI
// 設定連線到 mongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db
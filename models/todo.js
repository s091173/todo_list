// 定義資料結構 schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {  // 加入 User 關聯設定
    type: Schema.Types.ObjectId, // 連向另一個資料物件 ObjectId
    ref: 'User', // 參考對象為 User Model
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Todo', todoSchema)
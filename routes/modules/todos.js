// todos 路由模組
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo Model
const Todo = require('../../models/todo')

// New 頁面路由
router.get('/todos/new', (req, res) => {
  return res.render('new')
})

// Create 路由，新增一筆 To-do
router.post('/', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料

  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// Read 路由，瀏覽特定 To-do
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// Edit 頁面路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// Update 路由，接住修改頁面表單資料，修改特定 To-do
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// Delete 路由，刪除特定 To-do
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
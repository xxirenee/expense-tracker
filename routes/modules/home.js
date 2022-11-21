const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dayjs = require('dayjs')


router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const selectedCategory = []
  Category.find({})
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categories.forEach(category => {
        if (category._id.toString() === req.query.category) {
          category.selected = 'selected'
          selectedCategory.push(req.query.category)
        } else if (!req.query.category) {
          selectedCategory.push(category)
        }
      })
      Record.find({ userId, categoryId: selectedCategory })
        .lean()
        .populate('categoryId')
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach(record => {
            record.date = dayjs(record.date).format('YYYY/MM/DD')
            totalAmount += record.amount
          })
          res.render('index', { records, categories, totalAmount })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router

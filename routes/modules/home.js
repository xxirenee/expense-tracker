const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dayjs = require('dayjs')


router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const chooseCategory = []
  const reqCategory = req.query.category
  Category.find()
    .lean()
    .then(categories => {
      categories.forEach(category => {
        if (category._id.toString() === reqCategory) {
          category.selected = true
          chooseCategory.push(reqCategory)
        } else if(!reqCategory) {
          chooseCategory.push(category)
        }
      })
      Record.find({ userId, categoryId: chooseCategory })
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

const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dayjs = require('dayjs')

//新增
router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then((categories) => {
      res.render('new', { categories })
    })
    .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: '所有欄位都要填！' })
  }
  if (errors.length !== 0) {
    return Category.find({})
      .lean()
      .then(categories => {
        categories.forEach(data => {
          if (data._id.toString() === category) {
            data.selected = true
          }
        })
        res.render('new', {
          name,
          date,
          categories,
          amount,
          errors
        })
      })
  }
  req.body.userId = userId
  return Record.create({
    name,
    date,
    amount,
    categoryId: category,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id


  Record.findOne({ _id, userId })
    .populate('categoryId')
    .lean()
    .then(record => {
      record.date = record.date.toISOString().slice(0, 10)
      Category.find({ _id: { $ne: record.categoryId._id } })
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => res.render('edit', { record, categories }))
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

// 編輯
router.put('/:id', (req, res) => {

  const _id = req.params.id
  const userId = req.user._id

  const { name, date, category, amount } = req.body
  const errors = []
  if (!name || !date || category === '' || !amount) {
    errors.push({ message: '所有欄位都是必填！' })
  }
  if (errors.length !== 0) {
    return Category.find({})
      .lean()
      .then(categories => {
        categories.forEach(data => {
          if (data._id.toString() === category) {
            data.selected = true
          }
        })

        return res.render('edit', { categories, record: req.body })
      })
      .catch(error => console.error(error))
  }

  Record.findByIdAndUpdate({ _id }, { name, date, categoryId: category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
}
)


router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router

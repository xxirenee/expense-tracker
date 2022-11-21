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
    errors.push({ message: '所有欄位必填！' })
  }
  if (errors.length) {
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

//編輯

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Category.find({})
    
    .lean()
    .then(categories => {
      Record.findOne({ _id, userId })
        .lean()
        .populate('categoryId')
        .then(record => {
          record.date = dayjs(record.date).format('YYYY-MM-DD')
          categories.forEach(category => {
            if (categories.find(data => data._id.toString().includes(record.categoryId))) {
              category.selected = true
            }
          })
          res.render('edit', { record, categories })
        })
    })

})

router.put('/:id', (req, res) => {

  const _id = req.params.id
  const userId = req.user._id

  const { name, date, category, amount } = req.body
  const errors = []
  if (!name || !date || category === '' || !amount) {
    errors.push({ message: '所有欄位必填！' })
  }
  if (errors.length) {
    return Category.find({})
      .lean()
      .then(categories => {
        categories.forEach(data => {
          if (data._id.toString() === category) {
            data.selected = true
          }
        })
        req.body._id = req.user._id
        return res.render('edit', { categories, record: req.body, errors, _id })
      })
      .catch(error => console.error(error))
  }
  Record.findOneAndUpdate({ _id, userId }, { name, date, categoryId: category, amount })
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

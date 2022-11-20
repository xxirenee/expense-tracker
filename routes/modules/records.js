const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

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
  const { name, date, category, amount } = req.body

  Category.find({})
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        categories.forEach(item => {
          if (item._id.toString() === category) {
            item.selected = 'selected'
          }
        })
        res.render('new', {
          name,
          date,
          categories,
          amount
        })
      })


  Record.create({
    name,
    date,
    categoryId: category,
    amount,


  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


router.get('/edit', (req, res) => {
  return res.render('edit')
})

module.exports = router

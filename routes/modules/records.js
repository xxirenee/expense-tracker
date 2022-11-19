const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async (req, res) => {
  const { name, date, categoryId, amount } = req.body
  try {
    await Record.create({ name, date, categoryId, amount })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/edit', (req, res) => {
  return res.render('edit')
})

module.exports = router

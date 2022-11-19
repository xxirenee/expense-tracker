const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')
mongoose.connect(process.env.MONGODB_URI)
const app = express()
const port = process.env.PORT

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/', async(req, res) => {
    const { name, date, categoryId, amount } = req.body
    try {
      await Record.create({ name, date, categoryId, amount })
      res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  })

app.get('/records/edit', (req, res) => {
  return res.render('edit')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

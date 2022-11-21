const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
mongoose.connect(process.env.MONGODB_URI)
const app = express()
const PORT = process.env.PORT

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)



app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
mongoose.connect(process.env.MONGODB_URI)
const app = express()
const port = process.env.PORT

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

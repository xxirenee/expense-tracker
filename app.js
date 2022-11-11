const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.send('This project is built with Express')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Record = require('../record')
const User = require ('../user')
const SeedRecord = require('./record.json')
const Category = require('../category')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
const SeedUser = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    recordIndex: [1, 2, 3, 5]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
    recordIndex: [4]
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', async () => {
  const categories = await Category.find().lean().then()
  SeedRecord.forEach(record => {
    record.categoryId = categories.find(category => record.category === category.name)._id
  })
  Promise.all(
    Array.from(SeedUser, async (seed) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seed.password, salt))
        .then(hash => User.create({
          name: seed.name,
          email: seed.email,
          password: hash
        }))
        .then(user => {
          const records = SeedRecord.filter(item => {
            return seed.recordIndex.includes(item.id)
          })
          const seeds = []
          Promise.all(
            Array.from(records, recordIndex => {
              recordIndex.userId = user._id
              seeds.push(recordIndex)
            })
          )
          return Record.create(seeds)
        })
    }))
    .then(() => {
      console.log('record seed created successfully')
      process.exit()
    })
    .catch(err => console.log(err))
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require("../category")
const db = require('../../config/mongoose')

const categorySeeders = [
  { name: "家居物業", icon: "fa-solid fa-house" },
  { name: "交通出行", icon: "fa-solid fa-van-shuttle" },
  { name: "休閒娛樂", icon: "fa-solid fa-face-grin-beam" },
  { name: "餐飲食品", icon: "fa-solid fa-utensils" },
  { name: "其他", icon: "fa-solid fa-pen" }
]

db.once('open', () => {
  Category.insertMany(categorySeeders)
    .then(() => {
      console.log('categorySeeder created successfully')
      process.exit()
    })
})

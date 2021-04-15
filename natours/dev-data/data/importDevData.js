const fs = require('fs')
const Tour = require('../../models/tourModel')
const mongoose = require('mongoose')
const path = require('path');
const dotenv = require('dotenv')
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel')

dotenv.config({path:  path.resolve(__dirname, '../../.env')})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {console.log('DB Connection Successful')})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8' ));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8' ));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8' ));

const importData = async () => {
try {
  await Tour.create(tours)
  await User.create(users, {validateBeforeSave: false})
  await Review.create(reviews)

  console.log('data imported')
} catch (error) {
  console.log(error)
}
process.exit()
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log('data deleted')
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}

console.log(process.argv)
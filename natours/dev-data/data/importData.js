const fs = require('fs')
const Tour = require('../../models/tourModel')
const mongoose = require('mongoose')
const path = require('path');
const dotenv = require('dotenv')

dotenv.config({path:  path.resolve(__dirname, '../../.env')})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {console.log('DB Connection Successful')})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8' ));

const importData = async () => {
try {
  await Tour.create(tours)

  console.log('data imported')
} catch (error) {
  console.log(error)
}
process.exit()
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
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
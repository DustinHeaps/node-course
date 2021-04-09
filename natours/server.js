const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const app = require('./app')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {console.log('DB Connection Successful')})



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});

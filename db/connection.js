const mongoose=require('mongoose')

let mongoURL=process.env.MONGO_URL||'mongodb://localhost:27017/'
mongoose.connect(mongoURL)
.then(()=>{console.log('Connected! to database')})


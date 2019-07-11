const express=require('express')
const app = express()
const mongoose=require('mongoose')
let PORT=process.env.PORT || 5000
//db config
const db=require('./config/key').DB_CONNECT
mongoose.connect(db,{ useNewUrlParser: true })
.then(console.log('database connected'))
//body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users',require('./router/user'))
app.listen(PORT)
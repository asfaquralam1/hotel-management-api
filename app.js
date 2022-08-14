const e = require('express')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const cors = require('cors')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')
const orderRouter = require('./routes/order')


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
//
app.use(express.json())
app.use(userRouter)
app.use(roomRouter)
app.use(orderRouter)


app.listen(port,()=>{
    console.log('Server is up on port', + port)
})





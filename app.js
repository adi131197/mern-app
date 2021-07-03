require('dotenv').config()
require('./db/conn')
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cors())
app.use(express.json());
app.use(cookieParser())
// Router
app.use(require('./router/auth'))

const PORT = process.env.PORT || 5000;


app.get('/', (req,res) => {
  res.send("HELLO WORLD FROM SERVER");  
})

// app.get('/about', (req,res) => {
//     res.send("HELLO ABOUT PAGE")
// })

// app.get('/contact', (req,res)=> {
//     res.send('HELLO CONTACT PAGE')
// })

app.get('/signin', (req,res)=> {
    res.send('HELLO LOGIN PAGE')
})

app.get('/signup', (req,res)=> {
    res.send('HELLO REGISTER PAGE');
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
})


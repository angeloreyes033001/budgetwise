const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const router = require('./routers/routers')
const cors = require('cors')

require('dotenv').config()


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));

app.use('/api',router);
app.get('/',(req,res)=>{
    res.send("Test")
})

const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Running PORT:"+port)
})


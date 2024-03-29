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
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    origin: ["http://localhost:5173","https://31db-136-158-125-61.ngrok-free.app"],
    credentials: true,
}));

app.use('/api',router);
app.get('/',(req,res)=>{
    res.send("Test")
})

const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Running PORT:"+port)
})


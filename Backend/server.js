const express = require("express");
const connectToDb = require("./db");
const app = express();
require('dotenv').config();

app.use(express.json());

const Port = process.env.PORT || 6969;
const db_url = process.env.DB_URL 

app.get("/", (req, res) => {
    res.send("<h2> My name is Mayank Sharma. I am from squad-84 </h2>")
})

app.get('/ping', (req, res) => {
    res.send("<h1> I am currently inside ping destination! </h1>")
})

app.listen(Port, async() => {
    try{
        await connectToDb(db_url);
        console.log(`Server is running on port http://localhost:${Port}`);
        console.log(`Successfull connected to database with url as ${db_url}`)
    }
    catch(err){
        console.log(err)
    }
})
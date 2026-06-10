import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express()

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(PORT, ()=> {
    connectDb()
    console.log("server started")
})
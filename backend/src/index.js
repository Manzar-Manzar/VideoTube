import dotenv from "dotenv"
import connectDB from "./db/index.js"
import express from "express"

// Whenever we load this page, .env will be loaded first
dotenv.config({
    path: './env'
})

const app = express()

// connectDB is an asynchronous method. When it is executed, it technically returns a promise
connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`App is listening on port: ${process.env.PORT}`)
    })
    app.on("error", (error) => {
        console.log("ERRR:: ", error)
    })
})
.catch((error) => {
    console.log("MONGODB CONNECTION FAILED:: ", error);
    
})
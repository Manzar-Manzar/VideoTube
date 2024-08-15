import dotenv from "dotenv"
import connectDB from "./db/index.js"

// Whenever we load this page, .env will be loaded first
dotenv.config({
    path: './env'
})

connectDB()
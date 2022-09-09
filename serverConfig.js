import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import compression from "compression";
import router from "./routes/index.js";
import os from "os";

//express initialization
const app = express();

//dotenv
dotenv.config();

//session middleware
app.use(session({
    secret: process.env.SECRET || "",
    resave: false,
    saveUninitialized: true,
}))

//compression middleware (gzip)
app.use(compression());

//request body access middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cors middleware
app.use(cors())

//routing
app.use("/", router)

//static files and dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./public")))

//cpus count
const cpus = os.cpus();

//server port declaration
const PORT = process.env.PORT || 8080;

export { app, cpus, PORT };
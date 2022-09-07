import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import router from "./routes/index.js";
import cluster from "cluster";
import os from "os";
import logTextColor from "./logConfig.js";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import session from "express-session";

//express initialization
const app = express();

//dotenv
dotenv.config();

//compression middleware (gzip)
app.use(compression());

//request body access middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cors middleware
app.use(cors())

//session middleware
app.use(session({
    secret: process.env.SECRET || "",
    resave: true,
    saveUninitialized: true,
}))

//routing
app.use("/", router)

//static files and dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./public")))

//server port declaration
const PORT = process.env.PORT || 8080;

//request-processing mode logic
const processMode = process.env.PROCESSING_MODE.toUpperCase();

const cpus = os.cpus();

if(processMode === "CLUSTER" && cluster.isPrimary){
    cpus.map(() => {
        cluster.fork()
    })

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died, spawning a new worker`)
        cluster.fork();
    })
} else {
    //server start
    app.listen(PORT, () => {
        if(processMode === "CLUSTER"){
            console.log(`Server cluster initialized on port`, `${logTextColor.yellow}${PORT}${logTextColor.end}`, `- pid:`, `${logTextColor.cyan}${process.pid}${logTextColor.end}`)
        } else {
            console.log(`Initialized server listening port:`, `${logTextColor.yellow}${PORT}${logTextColor.end}`)
        }
    })
}
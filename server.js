import { app, cpus, PORT } from "./serverConfig.js";
import cluster from "cluster";
import logTextColor from "./logConfig.js";
import { createServer } from "http";
import { Server } from "socket.io";

//request-processing mode logic
const processMode = process.env.PROCESSING_MODE.toUpperCase();

//Variable para almacenar la ejecución del servidor
let ExpressSV;

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
            console.log(`${logTextColor.cyan}Initialized server listening port:${logTextColor.end}`, `${logTextColor.yellow}${PORT}${logTextColor.end}`)
        }
    })

    //websocket
    const http = createServer(app);
    const io = new Server(http);

    io.on(`connection`, (socket) => {
        console.log("user connected with id " + socket.id);
    })
}
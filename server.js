import { app, cpus, PORT } from "./serverConfig.js";
import cluster from "cluster";
import logTextColor from "./logConfig.js";

//request-processing mode logic
const processMode = process.env.PROCESSING_MODE.toUpperCase();

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
}
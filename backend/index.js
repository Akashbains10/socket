const { createServer } = require('http');
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const socketController = require('./controllers/socket.controller');


let httpServer;
let io;


mongoose.connect(config.url)
    .then(() => {
        console.log('Database connected successfully');
        httpServer = createServer(app);
        io = require('./socket')(httpServer);
        httpServer.listen(config.port, () => {
            console.log(`Server is listening at port ${config.port}`);
        })
    })
    .catch((err) => {
        console.log('Database connection failed:', err)
    })


const shutdown = async () => {
    try {
        if (io) {
            for (const [id, socket] of io.sockets.sockets) {
                console.log(`Forcing disconnect for socket: ${id}`);
                await socketController.disconnectUser(socket);
                socket.disconnect(true);
            }
        }
        if (httpServer) {
            httpServer.close(() => {
                console.log('HTTP server is closed');
                mongoose.connection.close();
                process.exit(0);
            })
        } else {
            process.exit(0);
        }
    } catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
    }
}


// this event in trigger when any user manualy terminate the server using Ctrl + C
process.on('SIGINT', shutdown)


// this event in trigger when server is crashed
process.on("SIGTERM", shutdown);
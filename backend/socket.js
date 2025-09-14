const { Server } = require('socket.io');
const socketController = require('./controllers/socket.controller');

    module.exports = (server) => {
        const io = new Server(server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        io.use(socketController.authenticateConnection);

        io.on('connection', (socket) => {
            console.log(`Socket connected with id ${socket?.id}`);
            socketController.connectUser(socket);
            socket.on('send_message', async (data) => {
                await socketController.sendMessage(io, socket, data)
            });
            socket.on('get_messages_list', (data)=> {
                socketController.getAllMessages(io, socket, data)
            });
            socket.on('disconnect', async () => {
                await socketController.disconnectUser(socket)
            })
        });

        return io;
    }
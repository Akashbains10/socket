const { createServer } = require('http');
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');


mongoose.connect(config.url)
    .then(() => {
        console.log('Database connected successfully');
        const httpServer = createServer(app);
        require('./socket')(httpServer);
        httpServer.listen(config.port, () => {
            console.log(`Server is listening at port ${config.port}`);
        })
    })
    .catch((err) => {
        console.log('Database connection failed:', err)
    })
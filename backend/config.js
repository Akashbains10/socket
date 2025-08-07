const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './.env') });

module.exports = {
    port: process.env.PORT,
    url: process.env.MONGO_URL,
    mode: process.env.NODE_ENV,
    backend_url: process.env.BACKEND_URL,
}
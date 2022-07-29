require('dotenv').config();
require('./providers/passport');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


console.log('*************************************');
console.log('* Express API Boilerplate');
console.log('*');
console.log('* ENV');
console.log(`* APP_ENV: ${process.env.APP_ENV}`);
console.log('*');
console.log('*');


////////////////////////////////////////////////
// Express
const app = express();
app.disable('x-powered-by');
app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/_readiness', (req, res) => res.send('healthy'));
app.get('/api/v1/_healthcheck', (req, res) => res.json({ status: 'ok' }));
if (typeof global.it !== 'function') app.use(morgan('[:date[iso]] HTTP/:http-version :status :method :url :response-time ms'));


////////////////////////////////////////////////
// HTTP
app.use('/api/v1/', require('./routes/auth'));
app.use('/api/v1/', require('./routes/user'));
app.use('/api/v1/', require('./routes/groups'));


////////////////////////////////////////////////
// Listens
let port = process.env.PORT || 80;
if (typeof global.it === 'function') port = 7777;
app.listen(port, () => console.log(`* Listening: http://127.0.0.1:${port}`));
module.exports = app;

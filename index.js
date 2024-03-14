require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./configs/DBContext');

const api_routes = require('./routes/api.route');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use('/images', express.static('public/images'))
api_routes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server is listening on http://%s:%s`, process.env.APP_HOST, process.env.APP_PORT);
});
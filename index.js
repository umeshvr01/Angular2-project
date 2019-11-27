const express = require('express'); // fast, minimalist web framework for node.
const app = express(); // Initiate express application.
const router = express.Router();
const mongoose = require('mongoose'); // Node tool for MongoDB.
const config = require('./config/database'); // Mongoose config.
const path = require('path'); //  NodeJS Package for file paths.
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blog')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


// Database connection
mongoose.connect(config.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err)
        console.log('Could NOT connect to database:', err);

    console.log('Connected to database:' + config.db);
});

app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
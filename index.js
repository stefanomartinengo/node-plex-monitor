const express = require('express')
	, axios = require('axios')
	, bodyParser = require('body-parser')
	, nodemailer = require('nodemailer')
	, cors = require('cors')
	, ctrl = require('./controller.js')
	, dotenv = require('dotenv').config()
	, port = process.env.server_port;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/plex', ctrl.plex);

// --------------------------------------------------Testing
app.get('/chat_widget', ctrl.chat_widget);
app.get('/send_message/:user_id/:number/:message', ctrl.send_message);

app.listen( port, () => console.log( 'plex server running local ' + port ) );
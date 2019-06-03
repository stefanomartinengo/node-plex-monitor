const express = require('express')
	, axios = require('axios')
	, bodyParser = require('body-parser')
	, nodemailer = require('nodemailer')
	, ctrl = require('./controller.js')
	, dotenv = require('dotenv').config()
	, port = process.env.server_port;

const app = express();
app.use(bodyParser.json());

app.get('/plex', ctrl.plex);


app.listen( port, () => console.log( 'plex server running local ' + port ) );

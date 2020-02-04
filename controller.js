const emailService = require('./utils/email_functions');
const dataService = require('./utils/data_functions');
const fetch = require('node-fetch');
const axios = require('axios');

let someHtml = 
		'<div style="width: 175px; height:300px border-radius: 5px 5px 0px 0px;"> <div style="display: flex; justify-content: center; align-items: center;border-radius: 5px 5px 0 0;background: lightblue; padding: 5px; height: 50px; margin: auto; font-size: 1.25rem;" class="header">custom header?</div> <div style="background: #fff; height: 200px; display: flex; flex-direction: column; justify-content: space-between;" class="chatbox"> <input style="box-shadow: none; border-left-style: hidden; margin: auto; width: 70%; border-top-style: hidden; border-right-style: hidden" placeholder="name"/><input style="box-shadow: none;border-left-style: hidden; margin: auto; width: 70%; border-top-style: hidden; border-right-style: hidden" placeholder="email"/> <input style="box-shadow: none; border-left-style: hidden; margin: auto; width: 70%; border-top-style: hidden; border-right-style: hidden" placeholder="message"/></div><div style="background: lightblue; height: 50px; display: flex; justify-content: center; align-items: center; font-size: 1.75rem; border-radius: 0 0 5px 5px; cursor: pointer;" onclick="$.get(`http://localhost:8082/send_message/123/8019465581/testmessagehereok ok`,  function(result) {$(`#embed`).html(result);})" class="inputfield">Send</div></div><p style="margin-top: 20px;"> Embed Chat widget on your site </p><div style="padding: 10px; width: 500px; border: 1px solid black;"></div>';

module.exports = {
	plex: async (req, res) => {
		try {
			let plex_now = await fetch('http://192.168.0.4:32400/status/sessions', {
				method: 'get',
				headers: { 'X-Plex-Token': process.env.x_plex_token}
				});
			if(plex_now) {
				let response_text = await plex_now.text();
				if(response_text) {
					let parsed_response = dataService.parse_xml(response_text);
					let formatted_response = dataService.format_response(parsed_response);
					console.log(parsed_response)
					if(!formatted_response) {
						// NO EMAIL SENT
						console.log('Nothing playing')
						return;
					} else {
						let sendMail = await emailService.sendMail(formatted_response);
						if(sendMail) {
							console.log('mail sent')
						}
					}
					res.send({
						success: true,
					});
				};
			};
		} catch (err) {
				console.log(err, 'err')
			}
	},

// ----------------------------------------------TESTING

	chat_widget: async (req, res) => {
		/**
		 * @description Call to send html to client
		 * @TODO Need to figure out how to inject function/jquery to html with onclick
		 */
				res.json({
			status: 200,
			value: someHtml
		});
	},
	send_message: async (req, res) => {
		console.log(req.params, 'req.params');
		res.json({
			status: 200,
			value: someHtml
		});
	}
}

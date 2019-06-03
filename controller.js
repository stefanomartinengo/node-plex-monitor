const emailService = require('./utils/email_functions');
const dataService = require('./utils/data_functions');
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
	plex: async (req, res) => {
		try {
			let plex_now = await fetch('http://192.168.0.14:32400/status/sessions', {
				method: 'get',
				headers: { 'X-Plex-Token': process.env.x_plex_token}
				});
			if(plex_now) {
				let response_text = await plex_now.text();
				if(response_text) {
					let parsed_response = dataService.parse_xml(response_text);
					let formatted_response = dataService.format_response(parsed_response);
					if(!formatted_response) {
						console.log('Nothing playing')
						return;
					} else {
						let sendMail = await emailService.sendMail(formatted_response);
						console.log(sendMail, 'sendMail')
						if(sendMail) {
							console.log('mail sent')
						}
						// hit email function?
					}
					res.send({
						success: true,
					});
				};
			};
		} catch (err) {
				console.log(err, 'err')
			}
	}
}

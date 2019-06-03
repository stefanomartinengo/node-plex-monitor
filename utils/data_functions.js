const parser = require('xml2json');

const options = {
    object: true,
    reversible: false,
    coerce: false,
    sanitize: true,
    trim: true,
    arrayNotation: false,
    alternateTextNode: false
};

module.exports = {
    parse_xml: (xml) => {
        let parsed_xml = parser.toJson(xml, options);
        return parsed_xml;
    },
    format_response: (parsed_xml) => {
        if(parsed_xml.MediaContainer.size === '0') {
            return null;
        }
        if(!parsed_xml.MediaContainer.Video.length) { // SINGLE
            let formatted_response = {
                show: parsed_xml.MediaContainer.Video.grandparentTitle ||parsed_xml.MediaContainer.Video.parentTitle || parsed_xml.MediaContainer.Video.title,
                title: parsed_xml.MediaContainer.Video.title,
                user: parsed_xml.MediaContainer.Video.User.title,
                player: parsed_xml.MediaContainer.Video.Player.product
            };
            let txt = `Show: ${formatted_response.show} \n Title: ${formatted_response.title} \n User: ${formatted_response.user} \n Player: ${formatted_response.player}`
            return txt;
        } else { // MULTIPLE
            let formatted_response = {};
            formatted_response.playing = [];
            formatted_response.Sessions = parsed_xml.MediaContainer.size;
            parsed_xml.MediaContainer.Video.map( vid => {
                        formatted_response.playing.push({
                            Show: vid.grandparentTitle || vid.parentTitle || vid.title,
                            Title: vid.title,
                            User: vid.User.title,
                            Player: vid.Player.product
                        })
            });
            return JSON.stringify(formatted_response);
        }
    }
}


//     response.MediaContainer.Video.map( vid => {
//         data['playing'].push( {
//             show: vid.grandparentTitle || vid.parentTitle || vid.title,
//             title: vid.title,
//             user: vid.User.title,
//             player: vid.Player.product
//         } )
//     })
// }
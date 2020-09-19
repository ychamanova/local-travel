const axios = require('axios');
const { twilioSid, twilioAuthToken } = require('../config/dev');

const client = require('twilio')(twilioSid, twilioAuthToken);

//twilio API
module.exports = app => {
    app.post(
        '/text',
        (req, res) => {
            client.messages
                .create({
                    to: req.body.to,
                    from: '+12065943853',
                    body: `Please click here for directions: https://www.google.com/maps/search/?api=1&query=${req.body.lat},${req.body.long} Stay Safe!`,
                })
                .then(message => console.log(message.sid));
            res.end();
        }
    )
}
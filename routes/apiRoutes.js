const axios = require('axios');
const { recreationKey } = require('../config/dev');

//receives latitude and longitude from client, makes api request for facilities to ridb api based on lat and long provided and returns the results back to client
module.exports = app => {
    app.get(
        '/facilities',
        (request, response) => {
            axios.get(`https://ridb.recreation.gov/api/v1/facilities?limit=50&offset=0&latitude=${request.query.lat}&longitude=${request.query.long}&radius=25`, {
                headers: {
                    'apikey': recreationKey,
                    Accept: 'application/json',
                },
            })
                .then(places => {
                    response.json(places.data.RECDATA)
                })
        }
    )

    //receives lat and long from client's browser api, sends request to geodb api and returns the city closest to the client back
    app.get('/city',
        (request, response) => {
            axios.get
                ("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&location=" + request.query.lat + request.query.long + "&radius=3&sort=-population")
                .then(result => {
                    const apiResponse = result.data;
                    response.send(apiResponse);
                })
                .catch(err => {
                    response.send('not found')
                });
        }
    )
}



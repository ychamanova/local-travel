const axios = require('axios');
const { response } = require('express');

module.exports = app => {
    app.get(
        '/facilities',
        (request, response) => {
            const url = 'https://ridb.recreation.gov/api/v1/facilities?latitude=37.773972&longitude=-122.1&state=CA&radius=100&limit=100';
            axios.get(url, { headers: { 'apikey': '' } })
                .then(places => response.send(places.data))
        }
    )
}

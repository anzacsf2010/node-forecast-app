const request = require("postman-request");

const geocode = (address, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=sk.eyJ1IjoiYW56YWNvc2YyMDEwIiwiYSI6ImNreDg1bnJtaDMwemMycG82ZGc0bHR4cjEifQ.6fk4oSdAbBaE1sb_LW9RKw";
    request({url: geocodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode service. Please try again later!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to determine location. Please revise the location date provided and try again!', undefined);
        } else {
            longitude = response.body.features[0].center[0];
            latitude = response.body.features[0].center[1];
            location = response.body.features[0].place_name;
            callback(undefined, {
                location,
                latitude,
                longitude
            });
        }
    });
}

module.exports = geocode;
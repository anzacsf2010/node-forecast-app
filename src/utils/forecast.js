const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = "http://api.weatherstack.com/current?access_key=b429c782280a4844aa1d3206dc73122e&query=" + latitude + "," + longitude + "&units=f";
    request({url: forecastUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service. Please try again later!', undefined);
        } else if (response.body.error) {
            callback('Unable to weather for the location provided. Please revise the location data provided and try again!', undefined);
        } else {
            const conditions = response.body.current.weather_descriptions[0];
            const temperature = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            const windspeed = response.body.current.wind_speed;
            const winddir = response.body.current.wind_dir;
            const precipitation = response.body.current.precip;
            const visibility = response.body.current.visibility;
            callback(undefined, {
                conditions,
                temperature,
                feelslike,
                windspeed,
                winddir,
                precipitation,
                visibility
            });
        }
    });
}

module.exports = forecast;

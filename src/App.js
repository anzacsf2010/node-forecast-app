'use strict'

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views'); // handlebars templates
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);
app.use(express.static(publicDirectoryPath));

const title = "Weather Forecast Webapp";

app.get('', (req, res) => {
    res.render('index',{
        title: title,
        subtitle: "Today's Weather"
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: title,
        subtitle: "Q&A"
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: title,
        subtitle: "About",
        name: "Andy St. Fort"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error', {
            title: title,
            subtitle: "Forecast Not Found!",
            error: "400",
            errormessage: "A valid address or city is required but could not be found in the request. Please try again with a valid address or city!"
        })
    }
    geocode(req.query.address, (error, {
        location,
        latitude,
        longitude} = {}) => {
        if (error !== undefined) {
            return res.render('error', {
                title: title,
                subtitle: "Location Forecast Not Found!",
                error: "400",
                errormessage: "Unable to find the geocode info for the location provided. Please try again later!"
            });
        }
        forecast(latitude, longitude, (error, {
            conditions,
            temperature,
            feelslike,
            windspeed,
            winddir,
            precipitation,
            visibility } = {}) => {
            if (error === undefined) {
                res.send({
                    location,
                    latitude,
                    longitude,
                    conditions,
                    temperature,
                    feelslike,
                    windspeed,
                    winddir,
                    precipitation,
                    visibility
                });
            } else {
                res.render('error', {
                    title: title,
                    subtitle: "Location Forecast Not Found!",
                    error: "400",
                    errormessage: "Unable to find the forecast for the location provided. Please try again later!"
                });
            }
        });
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: "Error Page",
        subtitle: "Page Not Found!",
        error: "404",
        errormessage: "You have clicked on a page that does not exist. Please click on any of the links above to get back to the application!"
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
'use strict'

const weatherform = document.querySelector('form');
const search = document.querySelector('#search');
const loading = document.querySelector('#loading');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');
const messagethree = document.querySelector('#message-3');
const messagefour = document.querySelector('#message-4');
const messageerror = document.querySelector('#messageerror');
const box = document.querySelector('.boxed');

weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    const url = "http://localhost:3000/weather?address=" + location;
    messageone.textContent = "";
    messagetwo.textContent = "";
    messagethree.textContent = "";
    messagefour.textContent = "";
    messageerror.textContent = "";
    loading.textContent = "Loading...";
    fetch(url).then((response) => {
        response.json().then((data) => {
            box.style.display = "block";
            if (data.error) {
                loading.textContent = "";
                return messageerror.textContent = "Unable to determine location/forecast!";
            }
            loading.textContent = "";
            messageone.textContent = data.location;
            messagetwo.textContent = "Lat: " + data.latitude + ", Long: " + data.longitude;
            messagethree.textContent = data.conditions + ", with a temperature of " + data.temperature + " degrees (F), feels like " + data.feelslike + " degrees (F).";
            messagefour.textContent = "Wind Speed: " + data.windspeed + " MPH " + data.winddir + ". " + data.precipitation + "% chance of rain with a visibility of " + data.visibility + " Miles.";
        });
    });
})
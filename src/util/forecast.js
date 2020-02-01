const request = require('request');

const weather = (longitud, latitud, callback) => {
    const url = `https://api.darksky.net/forecast/50a79c072bfc8dc8bb077c5dd3198c9c/${longitud},${latitud}?units=si&lang=es`;

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        }
        else if(body.error){
            callback('Unable to find location, Try a another one', undefined);
        }
        else {
            //const data = response.body;

            callback(undefined,body.currently );
        }
    });

}

module.exports = weather;
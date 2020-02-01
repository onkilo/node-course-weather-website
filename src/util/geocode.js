const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1Ijoib25raWxvIiwiYSI6ImNrNHZ1M2JzaDVrd2Eza282bmp4Znk4c3QifQ.ma2zvrPZXIZMED6ZNLLq0Q&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service', undefined);
        }
        else if(body.features.length < 1){
            callback('Unable to find location, Try a another one', undefined);
        }
        else{
            //const data = response.body;
            const longitud = body.features[0].center[0];
            const latitud = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, {longitud, latitud, location});
        }
    })
}

module.exports = geocode;
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./util/forecast');
const geocode = require('./util/geocode');

const app = express();

const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    

    res.render('index', {
        title : 'weather',
        name: 'Jose'
    });

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me please',
        message: 'Some random message',
        name: 'José'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jose'
    })
})

app.get('/weather', (req, res) => {


    if(!req.query.address){
        return res.send({
            'error': 'You must provide an address'
        });
    }
    geocode(req.query.address, (err, {longitud, latitud, location} = {}) => {
        if(err){
            return res.send({
                error: err
            });
        }else{
            forecast(longitud, latitud, ( fError, {summary} = {}) => {
                
                if(fError){
                    return res.send({
                        error: fError
                    })
                }
                else{
                    res.send({
                        forecast: summary,
                        location: location,
                        address: req.query.address
                    });
                }
                
            })
        }
        
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Help Page not Found',
        message: 'Error!! Requested help page was not found!!!',
        year: new Date().getFullYear()
    })
})


app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'Error!! Requested page was not found!!',
        year: new Date().getFullYear()

    })
})

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
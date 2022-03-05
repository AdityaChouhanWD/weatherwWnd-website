const express = require('express')
const hbs = require('hbs')
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../tampleats/views')
const partialPath = path.join(__dirname,'../tampleats/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        res.send({
            Error: 'provide an address'
        })
    } else {
        geocode(req.query.address,({latitude,longitude,location}={},error)=>{
            if(error)
            return res.send({error})
        
            forecast(latitude,longitude,(weatherData, error)=>{
            if(error){
            return res.send({error})
            }
            res.send({
                location: location,
                weather: weatherData.weather,
                temperature: weatherData.temperature,
                time: weatherData.time
            })
            })
        })
    }
})

app.get('/*',(req, res) => {
    res.render('404',{
        title: '404 page'
    })
})



app.listen(port,()=>{
    console.log('Server start on port '+port)
})
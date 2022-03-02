const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

console.log(process.argv[2])

geocode(process.argv[2],({latitude,longitude,location},error)=>{
    if(error)
    return console.log(error)

    forecast(latitude,longitude,(weatherData, error)=>{
    if(error){
        return console.log(error)
    }
    console.log(location);
    console.log(weatherData)
    })
})
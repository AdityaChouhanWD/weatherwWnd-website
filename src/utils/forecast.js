const request = require('request') 

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1c58407cf3fe74aa567ae1e42bac4e39&query='+latitude+','+longitude
    request({url: url, json: true},(error, response)=>{
        if(error){
            callback(undefined,'Data is off')
        } else if(response.body.error){
            callback(undefined,'rong lat and long')
        } else{callback({
            weather: response.body.current.weather_descriptions[0],
            temperature: 'It is '+response.body.current.temperature+'°C and It is feels like '+response.body.current.feelslike+'°C.',undefined,
            time: response.body.current.observation_time

        })
        }
    })
}

module.exports = forecast
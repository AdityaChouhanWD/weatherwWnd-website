const request = require('request')

const geocode = (address,callback)=>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdHlhcmFqMjAwMyIsImEiOiJja3l5N3luOGcwaXFsMndwZzVzbnM0ZnE3In0.8Rn62pKRBdLKloScGP2iRA&limit=1'
    
    request({url: geocodeURL, json: true},(error,response)=>{
        if(error){
            callback(undefined,'Data is off');
        } else if(response.body.features.length === 0){
            callback(undefined,'Unable to find location');
        } else{
            
            callback({
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            },undefined)
    }
})
}

module.exports = geocode
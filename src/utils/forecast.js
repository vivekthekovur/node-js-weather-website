const request = require('request');

const forecast= (latitude, longitude, callback)=>{
    const getWeatherReport = `http://api.weatherstack.com/current?access_key=b33101bd669dda6c308ed24b2f146486&query=${latitude},${longitude}`
    request({url:getWeatherReport, json:true},(error, {body})=>{
        if(error){
            callback('no network', undefined)
        }else if(body.error){
            callback('no match found', undefined)
        }else{
            callback(undefined, {
                location: body.location.country,
                weatherDescription:body.current.weather_descriptions
            })
        }

    })

}
module.exports= forecast;
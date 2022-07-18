const request = require('request');


const geoCode = (address, callback)=>{
    let getLatLong= `http://api.positionstack.com/v1/forward?access_key=25f4950d5c117e24137b7c424a5aeddc&query=${address}`/*+ encodeURIComponent(address)*/;
    request({url:getLatLong, json:true}, (error, {body})=>{
        if(error){
            callback('No network', undefined)
        }else if(body.data==0){
            callback('no match found',undefined)
        }else{
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })

}

module.exports = geoCode;
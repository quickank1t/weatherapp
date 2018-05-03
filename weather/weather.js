const request = require('request');

var getWeather = (latitude,longitude,callback)=>{
  request({
    url: `https://api.darksky.net/forecast/48617f70207216e5794ade1009882c40/${latitude},${longitude}`,
    json:true
  },(error, response, body)=>{
    if( response.statusCode === 200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }else{
      callback('Error while fleching the temperature');
    }
  })
}


module.exports.getWeather = getWeather;

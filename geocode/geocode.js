const request = require('request');

var geocodeAddress = (address , callback)=>{
  var extension = encodeURIComponent(address);
  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${extension}&key=AIzaSyA_aPj9Em_9vyCISkFIT-doEJ73McBu6JA`,
    json:true
  },(error, response, body)=>{
    if(error){
      callback('Error with the server');
    }else if(body.status === 'ZERO_RESULTS'){
      callback('Wrong address');
    }else if(body.status === 'OK'){
      callback(undefined,{
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports ={
  geocodeAddress
};

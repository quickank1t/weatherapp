const request = require('request');

request({
  url:'https://maps.googleapis.com/maps/api/geocode/json?address=hauptstrasse%2079%20eppelheim&key=AIzaSyA_aPj9Em_9vyCISkFIT-doEJ73McBu6JA',
  json:true
},(error, response, body)=>{
  console.log(JSON.stringify(`Address: ${body.results[0].formatted_address}`));
  console.log(JSON.stringify(`Lat & lon: (${body.results[0].geometry.location.lat} , ${body.results[0].geometry.location.lng} )`));

});

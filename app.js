const request = require('request');
const yargs = require('yargs');

const argv = yargs
.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to fetch weather',
    string:true
  }
  })
  .help()
  .alias('h','help')
  .argv;

var extension = encodeURIComponent(argv.a);
request({
  url:`https://maps.googleapis.com/maps/api/geocode/json?address=${extension}&key=AIzaSyA_aPj9Em_9vyCISkFIT-doEJ73McBu6JA`,
  json:true
},(error, response, body)=>{
  if(error){
    console.log("Error with the server");
  }else if(body.status === 'ZERO_RESULTS'){
    console.log("Wrong address");
  }else if(body.status === 'OK'){
    console.log(JSON.stringify(`Address: ${body.results[0].formatted_address}`));
    console.log(JSON.stringify(`Lat & lon: (${body.results[0].geometry.location.lat} , ${body.results[0].geometry.location.lng} )`));
  }


});

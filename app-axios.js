const yargs = require('yargs');
const axios = require('axios');
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
  var place;
  var extension = encodeURIComponent(argv.a);
  var encodedURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${extension}&key=AIzaSyA_aPj9Em_9vyCISkFIT-doEJ73McBu6JA`;
  axios.get(encodedURL)
  .then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
      console.log("Wrong address");
      throw new Error("Please check the address");
    }
    var latitude =  response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/48617f70207216e5794ade1009882c40/${latitude},${longitude}`;
    place = response.data.results[0].formatted_address;
    return axios.get(weatherURL);
  })
  .then((responseWeather)=>{
    var temperature= responseWeather.data.currently.temperature;
    var apparentTemperature= responseWeather.data.currently.apparentTemperature;
    console.log(`The temperature currently at ${place} is ${temperature}F and it feels like ${apparentTemperature}F`);
  })
  .catch((e)=>{
    if(e.errno === "ENOTFOUND"){
      console.log("Server cannot be found");
    }else{
      console.log(e.message);
    }

  });

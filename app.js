const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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

geocode.geocodeAddress(argv.a,(errorMessage,result)=>{
  if(errorMessage)
    console.log(errorMessage);
    else {
      // console.log(JSON.stringify(result));
      weather.getWeather(result.latitude,result.longitude,(errorMesage, weatherResult)=>{
        if(errorMesage){
          console.log(errorMesage);
        }else{
          console.log(`The temperature currently at ${result.address} is ${weatherResult.temperature}F and it feels like ${weatherResult.apparentTemperature}F`);
        }
      });
    }
});

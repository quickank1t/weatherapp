const yargs = require('yargs');

const geocode = require('./geocode/geocode')

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
      console.log(JSON.stringify(result));
    }
});

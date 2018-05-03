const request = require('request');

var geocodeAddress = (address)=>{
  return new Promise((resolve,reject)=>{
    var extension = encodeURIComponent(address);
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${extension}&key=AIzaSyA_aPj9Em_9vyCISkFIT-doEJ73McBu6JA`,
      json:true
    },(error,response,body)=>{
      if(error){
        reject('Error with the server');
      }else if(body.status === 'ZERO_RESULTS'){
        reject('Wrong address');
      }else if(body.status === 'OK'){
        resolve({
          address:body.results[0].formatted_address,
          latitude:body.results[0].geometry.location.lat,
          longitude:body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('qwdqwdqwd').then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
  console.log(errorMessage);
});

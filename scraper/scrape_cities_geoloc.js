const scrapeIt = require("scrape-it");
const request = require('request')
const rp = require('request-promise-native')
var fs = require('fs');

var cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
// console.log(cities)
// var city= cities[0]
cities.forEach(function(city){

    var api_key ="a60980cd9cfaa98f3acb20291a3a509d"
    var url = "http://api.opencagedata.com/geocode/v1/json?"
    url +="q="+city.name+","+city.state+", US"
    url += "&key="+api_key
    rp.get(url).then(function(e){
      var result = JSON.parse(e)
      console.log(result.results[0].geometry)
      city._geoloc = result.results[0].geometry
      fs.writeFile("cities.json", JSON.stringify(cities), function(err) {
        if(err) {
            return console.log(err);
        }
      })
    })
  // getLatLongCity(city.name,city.state).then(function(results){
  //   console.log(result)
  // })

})

function getLatLongCity(city_name, state){
  var api_key ="a60980cd9cfaa98f3acb20291a3a509d"
  var url = "http://api.opencagedata.com/geocode/v1/json?"
  url +="q="+city_name+","+state+", US"
  url += "&key="+api_key

  var options ={
      url: url,
      method: "GET",
      json:true,
    }
    var response = rp(options);
    return response.then(function (r){
      console.log("CiTY",r[0].body.results[0].geometry) //first result is best
        return r[0].body.results[0].geometry
    })
}

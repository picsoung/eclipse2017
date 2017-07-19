const scrapeIt = require("scrape-it");
const request = require('request')
const rp = require('request-promise-native')

var fs = require('fs');
var cities = JSON.parse(fs.readFileSync('cities.json', 'utf8')).cities;

console.log("CITIES",cities[0])

cities.forEach(function(city){
  console.log('https://www.timeanddate.com'+city.url)
  rp.get('https://www.timeanddate.com'+city.url).then(function(e){
    var k = scrapeIt.scrapeHTML(e,
        {
      svg: {
        selector: '#qlook > div:nth-child(2) > noscript',
        how: "html",
        convert(html){
          return html.split('src="')[1].split('" width="')[0].replace(/&amp;/g,'&')
        }
      }
    })
    city.img_url = k.svg
    console.log(city)
    fs.writeFile("cities.json", JSON.stringify(cities), function(err) {
      if(err) {
          return console.log(err);
      }
    })
  })
})

console.log("HERE")

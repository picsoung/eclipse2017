const scrapeIt = require("scrape-it");
const request = require('request')
const rp = require('request-promise-native')
var fs = require('fs');

var cities = JSON.parse(fs.readFileSync('cities_.json', 'utf8'));
// console.log(cities)



var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    console.log(body)

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

cities.forEach(function(city){
//
// c.tadst.com/scripts/eclipsegfx.php?w=200&h=200&t=1&sr=0.263535&mr=0.271856&mx=0.001951&my=-0.046049&hz=66.726609

  // var city= cities[0]
  var url = city.img_url
  url = 'http:'+url.replace(/v=2&t=1&w=120&h=120&/g,'w=200&h=200&t=1&')
  // console.log(url)
  // url = 'http://c.tadst.com/scripts/eclipsegfx.php?w=200&h=200&t=1&sr=0.263535&mr=0.271856&mx=0.001951&my=-0.046049&hz=66.726609'
  var name = city.name+"_"+city.state+".png"

  fs.stat('./images/'+name, function(err, stat) {
      if (err==null) {
        download(url, './images/'+name, function(){
          console.log('done');
        });
      }
  });
  // console.log(url,name)


})

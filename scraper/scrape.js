const scrapeIt = require("scrape-it");
const tabletojson = require('tabletojson');
const fs = require('fs')

scrapeIt("https://www.timeanddate.com/eclipse/in/usa", {
    cities: {
      listItem: '.tb-sm > tbody > tr',
      data:{
        name: 'td:first-child',
        state: 'td:nth-child(2)',
        url: {
              selector: "td > a"
              , attr: "href"
          }
      }
    }
}).then(page => {
    console.log(page);
    fs.writeFile("cities.json", JSON.stringify(page), function(err) {
    if(err) {
        return console.log(err);
    }
});
});

const fs = require('fs')

const zipcode_dist_key = require('../zipcode/zipcode_dist_key.json')
const zipcode_zh_en = require('../zipcode/zipcode_zh_en.json')

var dist_meta = {}
for(var dist in zipcode_dist_key) {
  dist_meta[dist] = { en: '', districts: {}}
  for(var country in zipcode_dist_key[dist]) {
    var zip = zipcode_dist_key[dist][country]
    dist_meta[dist].districts[country] = { 
      zipcode: zip,
      en: zipcode_zh_en[zip].name_en.split(',')[0]
    }
    var dist_en = zipcode_zh_en[zip].name_en.split(',')[1]
    if (dist_en) dist_meta[dist].en = dist_en
  }
}
fs.writeFile('dist_meta.json', JSON.stringify(dist_meta, null, 2), (err) => {
  if (err) throw err;
  console.log('done');
});
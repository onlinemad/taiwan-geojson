const fs = require('fs')
const JSONStream = require('JSONStream')
const es = require('event-stream')

const dist_meta = require('../dist_meta/dist_meta.json')

var writer = fs.createWriteStream('./twTown1982.geo.tiny.zh_en.json')

var parser = JSONStream.parse('features.*')

parser.on('end', () => {
  writer.write(new Buffer(']}'))
})

writer.write(new Buffer('{"type": "FeatureCollection","features": ['))

var counter = 0

fs.createReadStream('./twTown1982.geo.tiny.json')
  .pipe(parser)
  .pipe(es.map(function (data, cb) {
  	
  	console.log(data)

  	data.properties.COUNTYNAME_EN = dist_meta[data.properties.COUNTYNAME].en
  	data.properties.TOWNNAME_EN = dist_meta[data.properties.COUNTYNAME].districts[data.properties.TOWNNAME].en
    // if (data.geometry !== null) {
    //   cb(null, new Buffer((counter++ === 0 ? '' : ',') + JSON.stringify(data)))
    // } else {
    //   cb(null)
    // }
    console.log(data)
    cb(null, new Buffer((counter++ === 0 ? '' : ',') + JSON.stringify(data)))
  }))
  .pipe(writer)

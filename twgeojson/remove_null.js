const fs = require('fs')
const JSONStream = require('JSONStream')
const es = require('event-stream')

var writer = fs.createWriteStream('./twTown1982.geo.tiny.json')

var parser = JSONStream.parse('features.*')

parser.on('end', () => {
  writer.write(new Buffer(']}'))
})

writer.write(new Buffer('{"type": "FeatureCollection","features": ['))

var counter = 0

fs.createReadStream('./twTown1982.geo.json')
  .pipe(parser)
  .pipe(es.map(function (data, cb) {
    if (data.geometry !== null) {
      cb(null, new Buffer((counter++ === 0 ? '' : ',') + JSON.stringify(data)))
    } else {
      cb(null)
    }
  }))
  .pipe(writer)

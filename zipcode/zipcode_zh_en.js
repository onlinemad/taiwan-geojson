const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
fs.readFile('county_h_10508.xml', (err, data) => {
  parser.parseString(data, (err, result) => {
    var datas = result.dataroot.county_h_10508
    var table = {}
    datas.map(data => {
      var zip = data['欄位1'][0]
      table[zip] = {
        name: data['欄位2'][0],
        name_en: data['欄位3'][0]
      }
    })
    fs.writeFile('zipcode_zh_en.json', JSON.stringify(table, null, 2), (err) => {
      if (err) throw err
      console.log('done')
    })
  })
})
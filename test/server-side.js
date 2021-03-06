var fs = require('fs')
var assert = require('assert')

var imgur = require('../')

describe('imsave(ClientID)', function (done) {
  describe('returns an `upload` funcion', function () {
    it('supports buffers', function () {
      imgur('39cf80837546f04')(fs.readFileSync(__dirname + '/fixtures/image.jpeg'))
        .then(function (res) {
          assert(/^http:\/\/i\.imgur\.com\/[a-z0-9A-Z]\.[a-z]{3,4}$/.test(res))
        })
        .nodeify(done)
    })

    //todo: there seems to be a bug in form-data at the moment
    it.skip('supports streams', function (done) {
      imgur('39cf80837546f04')(fs.createReadStream(__dirname + '/fixtures/image.jpeg'))
        .then(function (res) {
          assert(/^http:\/\/i\.imgur\.com\/[a-z0-9A-Z]\.[a-z]{3,4}$/.test(res))
        })
        .nodeify(done)
    })
  })
})
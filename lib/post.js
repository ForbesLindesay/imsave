//N.B. `post-browser.js` is used in place of this file on the client
//     This means that 'hyperquest', 'concat-stream' and 'form-data'
//     are not downloaded.

var FormData = require('form-data')
var hyperquest = require('hyperquest')
var concat = require('concat-stream')

module.exports = post
function post(file, clientID, callback) {
  var fd = new FormData()
  fd.append('image', file)
  var headers = fd.getHeaders()
  headers.Authorization = 'Client-ID ' + clientID
  var req = hyperquest.post('https://api.imgur.com/3/image.json', {headers: headers})
  req.on('error', callback)
  fd.pipe(req)
  req.pipe(concat(function (res) { callback(null, res) }))
}
var Promise = require('promise')
var post = require('./lib/post')

// Get your own key: http://api.imgur.com/
//ClientID = 39cf80837546f04
//ClientSecret = 73087fb94d1c7a2ae3141c86e1da5c1c8ead63f5

module.exports = imgur;
function imgur(clientID, file, callback) {
  if (arguments.length === 1) {
    return function (file, callback) { return imgur(clientID, file, callback) }
  }
  return new Promise(function (resolve, reject) {
    if (!file) {
      var err = new Error('You must supply an image to upload.');
      err.code = 'MissingFile';
      throw err;
    }
    if (typeof FormData !== 'undefined' && !file.type.match(/image.*/)) {
      var err = new Error('Invalid file type, imgur only accepts images.');
      err.code = 'InvalidFileType';
      throw err;
    }
    post(file, clientID, function (err, res) {
      if (err) return reject(err)
      else return resolve(res)
    })
  })
  .then(JSON.parse)
  .then(function (res) {
    if (res.success) {
      return res.data.link
    } else {
      var err = new Error((res.data && res.data.error) || JSON.stringify(res))
      for (var key in res) {
        if (key !== 'success') err[key] = res[key]
      }
      throw err
    }
  })
  .nodeify(callback)
}
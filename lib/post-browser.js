module.exports = post
function post(file, clientID, callback) {
  var fd = new FormData()
  fd.append('image', file)
  var req = new XMLHttpRequest()
  req.onload = function () {
    callback(null, req.responseText)
  }
  req.onerror = callback
  req.open('post', 'https://api.imgur.com/3/image.json')
  req.setRequestHeader('Authorization', 'Client-ID ' + clientID)
  req.send(fd)
}
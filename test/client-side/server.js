var browserify = require('browserify-middleware')
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})
app.get('/client.js', browserify('./client.js'))

app.listen(3000)
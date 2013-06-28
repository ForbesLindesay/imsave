var imgur = require('../../')
var upload = imgur('39cf80837546f04')

var submit = document.getElementById('submit')
var input = document.getElementById('pictureIn')
var output = document.getElementById('pictureOut')

submit.addEventListener('click', function () {
  upload(input.files[0])
    .done(function (res) {
      output.src = res
    }, function (err) {
      //handle error here
      throw err
    });
}, false)
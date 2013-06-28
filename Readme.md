# imsave

Imgur image upload for node.js and the browser (via browserify).

[![Build Status](https://travis-ci.org/ForbesLindesay/imsave.png?branch=master)](https://travis-ci.org/ForbesLindesay/imsave)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/imsave.png)](https://gemnasium.com/ForbesLindesay/imsave)
[![NPM version](https://badge.fury.io/js/imsave.png)](http://badge.fury.io/js/imsave)

## Installation

To install, use:

    npm install imsave

You must then also acquire a ClientID from https://api.imgur.com/oauth2/addclient

## Sever Usage

```js
var imgur = require('imsave')('ClientID')

imgur(fs.readFileSync('image.jpeg'), function (err, url) {
  if (err) throw err
  console.log('URL for image: ' + url)
})

//or

imgur(fs.createReadStream('image.jpeg'), function (err, url) {
  if (err) throw err
  console.log('URL for image: ' + url)
})
```

## Client Usage

Using Browserify

```html
<input id="pictureIn" type="file" />
<img id="pictureOut"/>
<button id="submit">Upload</button>
```

```js
var imgur = require('imsave')('ClientID')

var submit = document.getElementById('submit')
var input = document.getElementById('pictureIn')
var output = document.getElementById('pictureOut')

submit.addEventListener('click', function () {
  imgur(input.files[0], function (err, res) {
    if (err) throw err //handle error here
    output.src = res
  })
}, false)
```

## Promises

If the callback is omitted, a [Promises/A+](http://promises-aplus.github.io/promises-spec/) promise is returned.  This is very useful for composing multiple asynchronous operations, especially if they are in parallel.

## License

  MIT
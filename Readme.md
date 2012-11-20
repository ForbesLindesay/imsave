
# imgur

  Imgur image upload component

## Installation

    $ component install ForbesLindesay/imgur

## Usage

  ```html
  <input id="pictureIn" type="file" />
  <img id="pictureOut"/>
  <button id="submit">Upload</button>
  ```

  ```javascript
  var imgur = require('imgur');
  var upload = imgur('your api key from http://api.imgur.com').upload;

  var submit = document.getElementById('submit');
  var input = document.getElementById('pictureIn');
  var output = document.getElementById('pictureOut');
  
  submit.addEventListener('click', function () {
    upload(input.files[0])
      .done(function (res) {
        output.src = res.links.original;
      }, function (err) {
        //handle error here
        throw err;  
      });
  }, false);
  ```

## API

### imgur(apikey)

  Return an instance of the imgur service object (`Imgur`).

### Imgur#upload(file)

  Upload a file object retrieved from drag and drop or a file input.  Returns an `ImgurRequest`.  If the file is not a valid file, the returned request will be rejected with `err.code == 'InvalidFileType'` or `err.code == 'MissingFile'` depending on whether a file-object was supplied.

### ImgurRequest#then(callback, errback)

  ImgurRequest is a [promise](https://github.com/promises-aplus/promises-spec) and thus the then-method conforms fully to this spec.  If the request is successful, it will respond with an object that looks like:

  ```javascript
  {
    image: {
      name: null,
      title: null,
      caption: null,
      hash: "JNBkq",
      deletehash: "yNbwhKYuMN4VdJ5",
      datetime: "2012-11-20 20:59:07",
      type: "image/png",
      animated: "false",
      width: 578,
      height: 226,
      size: 16204,
      views: 0,
      bandwidth: 0
    },
    links: {
      original: "http://i.imgur.com/JNBkq.png",
      imgur_page: "http://imgur.com/JNBkq",
      delete_page: "http://imgur.com/delete/yNbwhKYuMN4VdJ5",
      small_square: "http://i.imgur.com/JNBkqs.jpg",
      large_thumbnail: "http://i.imgur.com/JNBkql.jpg"
    }
  }
  ```

### ImgurRequest#done(callback, errback)

  This method is like `.then` except it doesn't return a promise for chaining, and won't swallow exceptions.  Use this in preference to `.then` if you're not doing other async operations when the upload completes.

### ImgurRequest#abort()

  Aborts the request and causes the promise to be rejected with an exception that has `err.code == 'UploadAborted'`.

## License

  MIT

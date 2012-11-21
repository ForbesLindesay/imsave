var promise = require('promises-a');
var emitter = require('emitter');

// Get your own key: http://api.imgur.com/
module.exports = imgur;
function imgur(apiKey) {
  function upload(file) {
    var def = promise();
    emitter(def.promise);
    try {
      if (!file) {
        var err = new Error('You must supply an image to upload.');
        err.code = 'MissingFile';
        throw err;
      }
      if (!file.type.match(/image.*/)) {
        var err = new Error('Invalid file type, imgur only accepts images.');
        err.code = 'InvalidFileType';
        throw err;
      }

      var fd = new FormData();
      fd.append("image", file); // Append the file
      fd.append("key", apiKey);
      
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
      xhr.onload = function () {
        try {
          def.fulfill(JSON.parse(xhr.responseText).upload);
        } catch (ex) {
          def.reject(ex);
        }
      }
      xhr.onerror = def.reject;
      xhr.upload.onprogress = function (e) {
        e.perecent = e.loaded / e.total * 100;
        def.promise.emit('progress', e);
      }
      def.promise.abort = function () {
        xhr.abort();
        var err = new Error('Image upload aborted');
        err.code = 'UploadAborted';
        def.reject(err);
      };

      xhr.send(fd);
    } catch (ex) {
      def.reject(ex);
    }
    return def.promise;
  }
  return {upload: upload};
}
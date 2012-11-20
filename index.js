var promise = require('promises-a');
var emitter = require('emitter');

module.exports = imgur;
function imgur(apiKey) {
  function upload(file) {
    var def = promise();
    emitter(def.promise);

    if (!file || !file.type.match(/image.*/))
      throw new Error('Invalid file type, imgur only accepts images.');

    var fd = new FormData();
    fd.append("image", file); // Append the file
    fd.append("key", apiKey);
    // Get your own key: http://api.imgur.com/
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
    xhr.onload = function () {
      try {
        def.fulfill(JSON.parse(xhr.responseText));
      } catch (ex) {
        def.reject(ex);
      }
    }
    xhr.onerror(def.reject);
    xhr.upload.onprogress = function (e) {
      e.perecent = e.loaded / e.total * 100;
      def.promise.emit('progress', e);
    }
    def.promise.abort = function () {
      xhr.abort();

    };

    xhr.send(fd);
    return def.promise;
  }
  return {upload: upload};
}
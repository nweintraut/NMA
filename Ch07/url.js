var url = require('url');
var urlStr = 'http://user:pass@host.com:80/resource/path?query=string#hash';
var urlObj = url.parse(urlStr, true, false);
console.log(urlObj.href);
console.log(urlObj.protocol);
console.log(urlObj.host);
console.log(urlObj.auth);
console.log(urlObj.hostname);
console.log(urlObj.pathname);
console.log(urlObj.port);
console.log(urlObj.search);
console.log(urlObj.path);
console.log(urlObj.query);
console.log(urlObj.hash);
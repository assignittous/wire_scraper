var fs, response, syncRequest;

// set up dependencies
fs = require("fs-extra"); // filesystem library
syncRequest = require('sync-request');  // makes a synchronous request to a web page, it's basically a `curl` command


// make a request to the web url
response = syncRequest("get", "https://en.wikipedia.org/wiki/List_of_The_Wire_episodes", {});


// write the response html to a file
fs.writeFileSync("./wire_episodes.html", response.body.toString('utf8'));


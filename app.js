#!/usr/bin/env node
"use strict";
require('process');
var stdin = process.stdin, stdout = process.stdout;
var inputChunks = [];
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});
stdin.on('end', function () {
    var json = inputChunks.join();
    var data = JSON.parse(json);
    for (var i = 0; i < data.proxies.length; ++i) {
        stdout.write("location /" + data.proxies[i].localPath + "/ {\n");
        stdout.write("\tproxy_pass '" + data.proxies[i].url + "';\n");
        for (var j = 0; j < data.proxies[i].headers.length; ++j) {
            stdout.write("\tproxy_set_header '" + data.proxies[i].headers[j].name + "' '" + data.proxies[i].headers[j].value + "';\n");
        }
        stdout.write("}\n");
    }
    stdout.write('\n');
});

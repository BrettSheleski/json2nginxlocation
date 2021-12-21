#!/usr/bin/env node
"use strict";
// Reads JSON from stdin and writes equivalent
// nicely-formatted JSON to stdout.
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
    stdout.write(JSON.stringify(data));
    stdout.write('\n');
});

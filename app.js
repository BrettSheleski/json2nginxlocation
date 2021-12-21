#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
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
    if (data.proxies) {
        for (var i = 0; i < data.proxies.length; ++i) {
            stdout.write("location /".concat(data.proxies[i].localPath, "/ {\n"));
            stdout.write("\tproxy_pass '".concat(data.proxies[i].url, "';\n"));
            for (var j = 0; j < data.proxies[i].headers.length; ++j) {
                stdout.write("\tproxy_set_header '".concat(data.proxies[i].headers[j].name, "' '").concat(data.proxies[i].headers[j].value, "';\n"));
            }
            stdout.write("}\n");
        }
        stdout.write('\n');
    }
    (0, process_1.exit)(0);
});

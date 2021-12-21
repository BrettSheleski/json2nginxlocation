#!/usr/bin/env node

// Reads JSON from stdin and writes equivalent
// nicely-formatted JSON to stdout.

require('process')


let stdin = process.stdin,
    stdout = process.stdout;

let inputChunks: Array<Buffer> = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});


type Data = {
    proxies : Array<Proxy>
};

type Proxy = {
    localPath : string,
    url : string,
    headers : Array<Header>,
    default? : string
};

type Header = {
    name : string,
    value: string
};

stdin.on('end', function () {

    let json: string = inputChunks.join();

    let data: Data = <Data>JSON.parse(json);


    for(let i = 0; i < data.proxies.length; ++i){
        stdout.write(`location /${data.proxies[i].localPath}}/ {`);
        stdout.write(`\tproxy_pass '${data.proxies[i].url}';`);

        for(let j = 0; j < data.proxies[i].headers.length; ++j){
            stdout.write(`\t\tproxy_set_header '${data.proxies[i].headers[j].name}' '${data.proxies[i].headers[j].value}';`);
        }

        stdout.write(`}`);
    }

    stdout.write(JSON.stringify(data));
    stdout.write('\n');
});
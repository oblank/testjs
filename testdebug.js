/**
 * Created by oBlank on 10/12/15.
 */
//x = 5;
//setTimeout(function () {
//    debugger;
//    console.log("world");
//}, 1000);
//console.log("hello");

//var dns = require('dns');
//
////dns.lookup('www.baidu.com', {family:4, all:true}, function onLookup(err, addresses, family) {
////    console.log('addresses:', addresses, family);
////});
//
//dns.resolve4('www.google.com', function (err, addresses) {
//    if (err) throw err;
//
//    console.log('addresses: ' + JSON.stringify(addresses));
//
//    addresses.forEach(function (a) {
//        dns.reverse(a, function (err, hostnames) {
//            if (err) {
//                throw err;
//            }
//
//            console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
//        });
//    });
//});

//var readline = require('readline');
//
//var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});
//
//rl.question("What do you think of Node.js? ", function(answer) {
//    // TODO: Log the answer in a database
//    console.log("Thank you for your valuable feedback:", answer);
//
//    rl.close();
//});

var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('OHAI> ');
rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        default:
            console.log('Say what? I might have heard `' + line.trim() + '`');
            break;
    }
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});
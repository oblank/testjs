/**
 * Created by oBlank on 10/12/15.
 */

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var timeouts = [];
function errorMsg() {
    console.error("Something must be wrong with the connection ...");
}


if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        console.log('master pid:' + process.pid);
    }
    cluster.on('fork', function(worker) {
        console.log('worker ' + worker.process.pid + ' fork');
    });
    cluster.on('online', function(worker) {
        console.log('worker ' + worker.process.pid + ' online');
    });
    cluster.on('listening', function(worker, address) {
        console.log('worker ' + worker.process.pid + ' listening');
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

    cluster.on('exit', function(worker, code, signal) {
        if( signal ) {
            console.log("worker was killed by signal: "+signal);
        } else if( code !== 0 ) {
            console.log("worker exited with error code: "+code);
        } else {
            console.log("worker success!");
        }
        console.log('\n\n工作进程 ' + worker.process.pid + ' 被结束。正在重启...');
        cluster.fork();
    });


    // Go through all workers
    function eachWorker(callback) {
        for (var id in cluster.workers) {
            callback(cluster.workers[id]);
        }
    }
    eachWorker(function(worker) {
        worker.send('big announcement to all workers');
    });

    Object.keys(cluster.workers).forEach(function(id) {
        cluster.workers[id].on('message', function(msg) {
            console.log("worker " + id  + " pid: " + cluster.workers[id].process.pid + " send msg:" + msg.data);
        });
    });

} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer(function(req, res) {
        console.log("response by pid:" + process.pid)

        res.writeHead(200);
        res.end("hello world "  + process.pid + "\n");
    }).listen(8000);
    console.log('child pid:' + process.pid);

    process.on('message', function(msg) {
        console.log('child pid:' + process.pid + "receive msg:" + msg);
        process.send({ cmd: 'sendBack',  data: msg});
    });
}
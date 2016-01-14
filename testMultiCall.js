var http = require ("http");

var cal = function (name, i) {
    http.get("http://panda.www.net.cn/cgi-bin/check.cgi?area_domain=huntxxxxx.com", function(res){
        res.on('data', function (chunk) {
            console.log(name + " - " + i + "\n");
            console.log('BODY: ' + chunk);
            console.log("\n\n\n");
        });

    }).on('error', function(e){
        console.log(e);
    });
}

for(i=0; i<10; i++) {
    cal("work"+i, 0);
}
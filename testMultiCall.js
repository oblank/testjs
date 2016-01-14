var http = require ("http");

var cal = function (name, i) {
    http.get("http://panda.www.net.cn/cgi-bin/check.cgi?area_domain=huntxxxxx.com", function(res){
        var body = "";
        res.on('data', function (chunk) {
            console.log(name + " - " + i + "\n");
            console.log(chunk);
            console.log("\n\n\n");
            body += chunk;
        });
        res.on('end', function() {
            // Data reception is done, do whatever with it!
            //var parsed = JSON.parse(body);
            //callback({
            //    email: parsed.email,
            //    password: parsed.pass
            //});

            //xml
            var parseString = require('xml2js').parseString;
            parseString(body, function (err, result) {
                console.dir(result);
            });
        });

    }).on('error', function(e){
        console.log(e);
    });
}

for(i=0; i<1; i++) {
    cal("work"+i, 0);
}
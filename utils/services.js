const http = require('http');
const discover_timeout = 100;
const ports = {
    accounts: 4001,
    habits: 4002,
    tasks: 4003,
    reports: 4004
};
module.exports = {
    ports,
    discover_timeout,
    numberOfServices: () => {
        return Object.keys(ports).length;
    },
    checkForService: (ip, success) => {
        var checkedCount = 0;
        var retObj = {};
        Object.keys(ports).forEach((key) => {
            var req = http.get({
                hostname: ip,
                port: ports[key],
                path: '/discover'
            }, (response) => {
                var body = '';
                response.on('data', (d) => {
                    body += d;
                });
                response.on('end', () => {
                    checkedCount++;
                    if(body == key){
                        retObj[key] = ip + ':' + ports[key];
                        console.log(`Found ${key} microservice in ${ip}:${ports[key]}`);
                    }
                    if (Object.keys(ports).length == checkedCount) {
                        if(Object.keys(retObj).length == 0){
                            success(null);
                        }else{
                            success(retObj);
                        }
                    }
                });
            });
            req.on('error', function(err) {
                if (err.code === "ECONNRESET") {
                
                }
            });            
            req.setTimeout(discover_timeout, () => {
                req.abort();
                checkedCount++;
                if (Object.keys(ports).length == checkedCount) {
                    if(Object.keys(retObj).length == 0){
                        success(null);
                    }else{
                        success(retObj);
                    }
                }
            });
        });
    }
};
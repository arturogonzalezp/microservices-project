const http = require('http');
const discover_timeout = 500;
const ports = {
    accounts: 4001,
    habits: 4002,
    tasks: 4003,
    reports: 4004
};
const config_file = 'frontend/services-config.json';
module.exports = {
    ports,
    discover_timeout,
    config_file,
    numberOfServices: () => {
        return Object.keys(ports).length;
    },
    checkForService: (ip, success) => {
        var checkedCount = 0;
        var retObj = {};
        Object.keys(ports).forEach((key) => {
            var req = http.request({
                hostname: ip,
                port: ports[key],
                path: '/discover',
                method: 'GET',
                headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36'}
            }, (response) => {
                var body = '';
                response.on('data', (d) => {
                    body += d;
                });
                response.on('end', () => {
                    checkedCount++;
                    if(body == key){
                        retObj[key] = ip + ':' + ports[key];
                        console.log(`\nFound ${key} microservice in ${ip}:${ports[key]}`);
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
            req.end();
        });
    }
};
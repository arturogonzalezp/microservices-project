const fs = require('fs');
const ip_info = require('./utils/ip_info.js');
const services = require('./utils/services.js');
var services_locations = {};
var ip_list = [];
var ip_list_count = 0;
const writeLocations = () => {
    fs.writeFileSync(services.config_file, JSON.stringify(services_locations));
    console.log(`\nUpdated ${services.config_file} file`);
};
const searchForServicesInList = () => {
    if (services.numberOfServices() > Object.keys(services_locations).length) {
        if (ip_list.length > 0) {
            var percentage = ((ip_list_count - ip_list.length) / ip_list_count) * 100;
            process.stdout.write('\r\x1b[K');
            process.stdout.write(`Loading... (${Math.floor(percentage)}%)`);
            services.checkForService(ip_list.shift(), (servicesFounded) => {
                if (servicesFounded) {
                    Object.keys(servicesFounded).forEach((key) => {
                        if (!services_locations[key]) {
                            services_locations[key] = servicesFounded[key];
                        }
                    });
                }
                searchForServicesInList();
            });
        } else {
            writeLocations();
        }
    } else {
        writeLocations();
    }

};

console.log('Checking for network info...');
ip_info.loadNetworkInfo((info) => {
    console.log('Checking for ip address list...');
    ip_list = ip_info.getIpAddressList(info);
    ip_list_count = ip_list.length;
    console.log(`Checking network ${info.networkAddress}/${info.subnetMaskLength} (${ip_list_count} hosts)`);
    searchForServicesInList();
});
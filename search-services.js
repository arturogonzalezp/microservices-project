const fs = require('fs');
const ip_info = require('./utils/ip_info.js');
const services = require('./utils/services.js');
var services_locations = {};
var ip_list = [];

const writeLocations = () => {
    fs.writeFileSync('services-config.json',JSON.stringify(services_locations));
    console.log('Updated services-config.json file');
};
const searchForServicesInList = () => {
    if (services.numberOfServices() > Object.keys(services_locations).length) {
        if (ip_list.length > 0) {
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
    console.log(`Checking from ${ip_list[0]} to ${ip_list[ip_list.length - 1]}`);
    searchForServicesInList();
});
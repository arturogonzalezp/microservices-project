const ip = require('ip');
const network = require('network');

module.exports = {
    loadNetworkInfo: (success) => {
        network.get_active_interface((err, obj) => {
            var info = ip.subnet(obj.ip_address, obj.netmask);
            success(info);
        });
    },
    getIpAddressList: (info) => {
        var list = [];
        var ip_long = ip.toLong(info.firstAddress);
        for(var i = 0; i < info.numHosts; i++){
            var new_ip = ip_long + i;
            list.push(ip.fromLong(new_ip));
        }
        return list;
    }
};
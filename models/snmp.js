exports = module.exports = function(app, mongoose) {

    var snmpSchema = new mongoose.Schema({  
        nombre:     { type: String },
        oid:        { type: Number },
        mib:        { type: String },
        tipo:       { type: String, enum:
            ['System', 'Interfaces', 'DNS', 'IP', 'ICMP', 'TCP', 'UDP', 'EGP']
        }
    });
    mongoose.model('Snmp', snmpSchema); 
};

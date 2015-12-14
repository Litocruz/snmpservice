// Example code for node-snmp-native.
// ----

// This file contains examples of how to use the library.

// Basic setup
// -----

// The snmp object is the main entry point to the library.
var snmp = require('snmp-native');

var util = require('util');

//var host = 'litocruz.noip.me';
var host = '192.168.200.37';
var community = 'public';


// All OIDs are represented as integer arrays.
// There is no interpretation of string or MIB names.

var oids = [[1, 3, 6, 1, 2, 1, 1, 1, 0], [1, 3, 6, 1, 2, 1, 2, 2, 1, 6, 4], [1,3,6,1,2,1,2,2,1,7,4] ]; // sysDescr.0
var cnt = 254; // Expected number of callbacks.
var rango = '192.168.200.'
var response='';
//GET - Return smp especifico
exports.GetOid = function(req, res) {
    for(var i = 1; i < 255; i++){
        
        var session  = new snmp.Session({  community: community });
        /*jshint loopfunc:true */
        // We need a function to get a closure over i.
        (function (host) {
            // Getting a single value
            // -----
            // This is how you issue a simple get request.
            session.getAll({host: host, oids: oids }, function (err, varbinds) {
                var vb;
                //console.log(varbinds);
                varbinds.forEach(function (vb) {
                  if (err) {
                      // If there is an error, such as an SNMP timeout, we'll end up here.
                      console.log('Error en host: '+host+' ->'+err);
                      //res.status(500).send(err.message);
                  } else {
                      //vb = varbinds[0];
                      vb['ip'] = host;
                      response += vb;
                      console.log(host+'-->' + vb.oid + '='+ vb.value + ' ip: '+ vb.ip);
                   //   console.log('GET /snmp')
                  //    console.log(vb);

                  }
                });

                if (--cnt === 0) {
                  res.send(response);  
                  session.close();
                }
            
            });
        }(rango + i));
    }
};


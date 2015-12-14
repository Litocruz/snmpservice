var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
    process.env.IP  = "localhost"
    process.env.PORT  = "8888"

//Coneccion Base de Datos
mongoose.connect('mongodb://'+process.env.IP+'/snmps', function(err, res){
    if(err) throw err;
      console.log('conectado a la Base de Datos.');
});


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Importacion de Modelo y Controlador
var models    = require('./models/snmp')(app, mongoose);
var SnmpCtrl  = require('./controllers/snmp');

//Router de Ejemplo
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello World!");
});
app.use(router);

//API Routes
var snmps = express.Router();

snmps.route('/snmp')
  .get(SnmpCtrl.GetOid)
  //.post(SnmpCtrl.addSnmp);
  
//snmps.route('/snmp/:id')
  //.get(SnmpCtrl.findById)
  //.put(SnmpCtrl.updateSnmp)
  //.delete(SnmpCtrl.deleteSnmp);

app.use('/api', snmps);
  
//Iniciar servidor
app.listen(process.env.PORT, function() {
  console.log("Node server running on "+process.env.IP+":"+process.env.PORT);
})

'use strict';
//Parameters
const nodePort = 4438 || process.env.PORT;


//===========================Modules exports==========================
//HTTPS MODULE
const httpsLocalhost = require("https-localhost");
const app = httpsLocalhost();


var     
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
logger = require("morgan"),
http = require("http"),
errorHandler = require("errorhandler")
;

//Create Server
var server = http.createServer(app);


//My libraries
var
routes = require('./server/routes')
;

//============================Configuration our server==================
app.use(bodyParser.json());
app.use(methodOverride());

switch (app.get('env')){
    case 'development':
        app.use(logger('combined'));
        app.use(errorHandler(
            {
                dumExceptions : true,
                showStack : true
            }
        ));//We can put production case
}

routes.configRoutes(app, server);
app.get('/',(req,res)=>{
    res.send("BISMILLAH")
})


//=============================Start server=========================
app.listen(nodePort)
console.log(
    'express server listening on port %d in %s mode',
    nodePort,
    app.settings.env
);

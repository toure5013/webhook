/*
 * routes.js
 */

"use strict";

//=============We export our module using require======================

const axios = require("axios"),
  moment = require("moment");
//=============We declare our variable======================
var 
configRoutes,
  recastMemory,
  getData,
  isReplyList = false,
  replyMsgArray = [],
  replyObj = {},
  URLAPI = "http://localhost:8081/api/v1/"; //this is the url of our API
//======================Recast variable declaration======================
var 
  recastIntents = "",
  recastEntities = "",
  recastConversationId = "",
  replyMsg = ""
;

//My libraries
var 
routeInternet = require('../routes/services/internet'),
routeMbile = require('../routes/services/mobile'),
routeOrangeMoney = require('../routes/services/orange_money')
;



var parametres = "";




//=============We get value from our API : API CONSUME======================
getData = function(url) {
  return new Promise(function(resolve, reject) {
    axios
      .get(url)
      .then(function(response) {
        //Les données present dans response
        resolve(response.data);
        // console.log( response );
      })
      .catch(function(error) {
        //Executer si erreur
        reject(error);
        console.error("Error was happened while accessing to Orange API.");
      })
      .finally(function() {
        // Aexecuter quoiqu'il arrive
      });
  });
};

//===============Build our routes====================

configRoutes = function(app, server) {
  //The parameters 
  var 
    appCaller = app,
    serverCaller = server
  ;
  //get all data sent by user from recast
  app.all("/*", function(request, response, next) {

    try{
        //Get all variable value from recast
        if(request.body.conversation.memory){
          recastMemory = request.body.conversation.memory;    
        }
        //Get id from recast
        //recastConversationId = request.body.conversation.Id;
        //Get intent from recast

        if(request.body.nlp.intents){
          recastIntents = request.body.nlp.intents;  
        }

        if(request.body.nlp.entities){
          recastEntities = request.body.nlp.entities;
        }
          //console.log(request.body);

    }catch(e){
        response.send({  
        "Error" : "Out of Recast",
        "Message" : "Memory is undefined  : " + e
      })
    }
    

    next();
  });

  /*  app.post( '/', async function( request, response ){

       // console.log(request.body.conversation.id);
         // Get  data from API synchronously.
       try{
         var data = await getData( URLAPI );
          console.log(data); //we test in our console and format our data
        }
           catch( err ){
           console.error( err );
        }
   }); */
//--------------------- Services --------------//
  app.post("/services", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlService = URLAPI + "services";
      var data = await getData(urlService);
      if (recastIntents[0].slug == "infos_services") {
        //dataLisy
        var dataList = [
          {
            title: "Services " + data.internet.name,
            imageUrl: "https://www.orange.ci/particuliers/1/66/27.jpg",
            subtitle: "",
            buttons: []
          },
          {
            title: "Services " + data.mobile.name,
            imageUrl: "https://www.monpetitforfait.com/wp-content/uploads/2018/11/application-client-orange.png",
           subtitle: "",
            buttons: []
          },
          {
            title: "Services " + data.orangemoney.name,
            imageUrl: "https://www.africaguinee.com/sites/default/files/field/image/orange_4.png",
            subtitle: "",
            buttons: []
          }
        ];
        let buttonLst = [];
        //console.log(data.internet.name + " , " + data.mobile.name + " , " + data.orangemoney.name );

        //Response
        response.send({
          replies: [
            {
              type: "list",
              content: {
                elements: dataList,
                buttons: buttonLst
              }
            }
          ],
          conversation: {
            memory: {}
          }
        });
      }
    } catch (err) {
      console.error("Error :" + err);
    }
  });

  //----------------------------------------------------------------------------------
                                  //Call the other routes here
  //------------------------------------------------------------------------------------

    routeInternet.configInternetRoutes(appCaller, serverCaller, recastMemory, recastIntents,  recastEntities);
    routeMbile.configMobileRoutes(appCaller,serverCaller, recastMemory, recastIntents,  recastEntities);
    routeOrangeMoney.configOrangeMoneyRoutes(appCaller,serverCaller, recastMemory, recastIntents,  recastEntities);

  //Errors
  app.post("/errors", (req, res) => {
    console.log("ERROR : " + req.body);
    res.send();
  });
};

//===================We export our route to outside================
module.exports = { configRoutes: configRoutes };

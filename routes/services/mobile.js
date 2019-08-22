/*
 * routes.js
 */

"use strict";

//=============We export our module using require======================

const axios = require("axios"),
  moment = require("moment");
//=============We declare our variable======================
var 
  configMobileRoutes,
  URLAPI = "http://localhost:8081/api/v1/"; //this is the url of our API
//======================Recast variable declaration======================
var 
  replyMsg = ""
;



//My functions importations

var functions = require('../functions/functions')
 



//===============Build our Mobile outes====================

configMobileRoutes = function(app, server, recastMemory, recastIntents,  recastEntities) {


    //get all data sent by user from recast
    app.all("/*", function(request, response, next) {
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
  
      next();
    });
   
    
  //====SERVICE MOBILE====//
  app.post("/services/mobile", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlServiceMobile = URLAPI + "services/mobile";
      var dataInternet = await functions.getData(urlServiceMobile);
      var dataInternetReturn = dataInternet.description;
      console.log(dataInternetReturn);
      if (recastIntents[0].slug == "infos_services_mobile") {
        
        replyMsg = [{
          type: "text",
          delay: 1,
          content: dataInternetReturn
        }];
        //Response
        response.send({
          replies: replyMsg,
          conversation: {
              memory: {}
          }
      });
      }
    } catch (err) {
      console.error("Error :" + err);
    }
  });

  //====SERVICE MOBILE====//
}

//===================We export our route to outside================
module.exports = { configMobileRoutes: configMobileRoutes };

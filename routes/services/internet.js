/*
 * routes.js
 */

"use strict";

//=============We export our module using require======================

const axios = require("axios");

//=============We declare our variable======================
var 
  configInternetRoutes,
  URLAPI = "http://localhost:8081/api/v1/"; //this is the url of our API

//======================Recast variable declaration======================
var 
  replyMsg = ""
;


//My functions importations

var functions = require('../functions/functions');

//var functions = require('../functions/entete.js');
 



//===============Build our Internet outes====================

configInternetRoutes = function(app, server, recastMemory, recastIntents,  recastEntities ) {

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
      //console.log(recastEntities.raw);
  
      next();
    });


  
//--------------------- Services internet --------------//
  app.post("/services/internet", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlServiceInternet = URLAPI + "services/internet";
      var dataInternet = await functions.getData(urlServiceInternet);
      var serInternetDescrip = dataInternet.description;
      console.log(serInternetDescrip);
      if (recastIntents[0].slug == "infos_services_internet") {
        replyMsg = [{
          type: "text",
          delay : '1',
          content: dataInternet.description
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

  app.post("/services/internet/data", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlServiceInternet = URLAPI + "services/internet/data";
      var dataInternet = await functions.getData(urlServiceInternet);
      var dataInternetReturn = dataInternet.description;
      if (recastIntents[0].slug == "infos_services_internet_data") {
        
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

  //Gestion des offres data : 
  app.post("/services/internet/data/data-offre", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlServiceData = URLAPI + "services/internet/data";

      var dataOffre = await functions.getData(urlServiceData);
      var dataOffreReturn = "";

      if (recastIntents[0].slug.toLowerCase() == "infos_services_internet_data"  ) {
          if( recastEntities["particulier"] ){
            //Format data
            dataOffreReturn = "Nous avons les offres suivantes : ";
            dataOffre.particulier.forEach(function(element) {
              dataOffreReturn  += element + " , "
             });
             dataOffreReturn  += " lequel vous interesse ?";
             //Return data
            replyMsg = [{
              type: "text",
              delay: 1,
              content: dataOffreReturn
            }];
            //Response
              response.send({
                replies: replyMsg,
                conversation: {
                    memory: {}
                }
            });

          }else if(recastEntities["entreprise"]){
            console.log()
            //Format data
             dataOffreReturn = "Nous avons les offres suivantes : ";
             dataOffre.entreprise.forEach(function(element) {
              dataOffreReturn  += element + " , "
             });
             dataOffreReturn  += " lequel vous interesse ?";
              //Return data
            replyMsg = [{
              type: "text",
              delay: 1,
              content: dataOffreReturn
            }];
            //Response
            response.send({
              replies: replyMsg,
              conversation: {
                  memory: {}
              }
          });
          }
          else{
            console.log("ok 3 ");
            dataOffreReturn  = "Vous voulez des informations sur la data veuillez nous precisez des infos...";
            replyMsg = [{
              type: "text",
              delay: 1,
              content: dataOffreReturn
            }];
          }
    
      }
    } catch (err) {
      console.error("Error :" + err);
    }
  });
  

  app.post("/services/internet/fibre", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlServiceInternet = URLAPI + "services/internet/fibre";
      var dataFibre = await functions.getData(urlServiceInternet);
      var dataInternetFibreReturn = dataFibre.description;
      console.log(dataInternetFibreReturn);
      if (recastIntents[0].slug == "infos-services-internet-fibre") {
        
        replyMsg = [{
          type: "text",
          delay: 1,
          content: dataInternetFibreReturn
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

  //====FIBRE OPTIQUE==========//

}

//===================We export our route to outside================
module.exports = { configInternetRoutes: configInternetRoutes };

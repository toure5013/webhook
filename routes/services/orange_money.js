/*
 * routes.js
 */

"use strict";

//=============We export our module using require======================

const axios = require("axios");
//=============We declare our variable======================
var 
  configOrangeMoneyRoutes,
  URLAPI = "http://localhost:8081/api/v1/"; //this is the url of our API
//======================Recast variable declaration======================
var

  replyMsg = ""
  ;




//My functions importations

var functions = require('../functions/functions')



//===============Build our Mobile Money routes====================


configOrangeMoneyRoutes = function (app, server, recastMemory, recastIntents,  recastEntities) {


  //get all data sent by user from recast
  app.all("/*", function (request, response, next) {
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

  //====ORANGE MONEY=====//

  //=========  =====  =====  =====  =====  =====  =====                 INFORMATION ORANGE MONEY          =====  =====  =====  =====  =====  =====  =====//

  //Bloquer compte
  app.post("/services/orangemoney/info", async function (request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
      let urlServiceOrangeMoney = URLAPI + "services/orangemoney";
      var dataOrangemoney = await functions.getData(urlServiceOrangeMoney);
      var dataOrangemoneyReturn = dataOrangemoney;

      if (recastIntents[0].slug == "infos_services_om") {
        //bloquer som compte
        if (recastEntities["bloquer-compte"]) {
          //Format data
          var dataOrangemoneyReturn = dataOrangemoneyReturn.compte - bloquer.description;
          //Return data
          replyMsg = [{
            type: "text",
            delay: 1,
            content: dataOrangemoneyReturn
          }];
          //Response
          response.send({
            replies: replyMsg,
            conversation: {
              memory: {}
            }
          });
        }
        //créer un compte
        else if (recastEntities["creer-compte"]) {
          //Format data
          var dataOrangemoneyReturn = dataOrangemoneyReturn.compte - bloquer.description;
          //Return data
          replyMsg = [{
            type: "text",
            delay: 1,
            content: dataOrangemoneyReturn
          }];
          //Response
          response.send({
            replies: replyMsg,
            conversation: {
              memory: {}
            }
          });
        }
        //transfert
        else if (recastEntities["transfert"]) {
          //Format data
          var dataOrangemoneyReturn = dataOrangemoneyReturn.transfert.description;
          //Return data
          replyMsg = [{
            type: "text",
            delay: 1,
            content: dataOrangemoneyReturn
          }];
          //Response
          response.send({
            replies: replyMsg,
            conversation: {
              memory: {}
            }
          });
        }
        //solde
        else if (recastEntities["solde"]) {
          //Format data
          var dataOrangemoneyReturn = dataOrangemoneyReturn.solde.description;
          //Return data
          replyMsg = [{
            type: "text",
            delay: 1,
            content: dataOrangemoneyReturn
          }];
        }
        //visa
        else if (recastEntities["visa"]) {
          //Format data
          var dataOrangemoneyReturn = dataOrangemoneyReturn.visa.description;
          //Return data
          replyMsg = [{
            type: "text",
            delay: 1,
            content: dataOrangemoneyReturn
          }];
        //Response
        response.send({
          replies: replyMsg,
          conversation: {
            memory: {}
          }
        });
        } else {
          //Format data
          var dataOrangemoneyReturn = dataOrangemoneyReturn.liste.description;

          dataOrangemoneyReturn = "Avec orange money vous avez droit à diferentes services, a savoir : ";

          //dataList
          var dataOrangeMoneyList = [
            {
              title: "Services " + dataOrangemoneyReturn[0],
              imageUrl: "https://www.orange.ci/particuliers/1/66/27.jpg",
              subtitle: "Ouverture de compte ",
              buttons: []
            },
            {
              title: "Services " + dataOrangemoneyReturn[1],
              imageUrl: "https://www.monpetitforfait.com/wp-content/uploads/2018/11/application-client-orange.png",
              subtitle: "Grille des tarifs ",
              buttons: []
            },
            {
              title: "Services " + dataOrangemoneyReturn[2],
              imageUrl:
                "https://www.africaguinee.com/sites/default/files/field/image/orange_4.png",
              subtitle: "carte visa ",
              buttons: []
            },
            {
              title: "Services " + dataOrangemoneyReturn[3],
              imageUrl:
                "https://www.africaguinee.com/sites/default/files/field/image/orange_4.png",
              subtitle: "Payement de factures",
              buttons: []
            },
            {
              title: "Services " + dataOrangemoneyReturn[4],
              imageUrl:
                "https://www.africaguinee.com/sites/default/files/field/image/orange_4.png",
              subtitle: "Transactions ",
              buttons: []
            }
          ];

          let buttonList = [];
          //console.log(data.internet.name + " , " + data.mobile.name + " , " + data.orangemoney.name );

          //Response
          response.send({
            replies: [
              {
                type: "list",
                content: {
                  elements: dataOrangeMoneyList,
                  buttons: buttonList
                }
              }
            ],
            conversation: {
              memory: {}
            }
          });
        }

      
      }
    } catch (err) {
      console.error("Error----- :" + err);
    }
  });


  //=========  =====  =====  =====  =====  =====  =====                 OPERATION MONEY          =====  =====  =====  =====  =====  =====  =====//
  //Consulter son compte

  app.post("/services/orangemoney/operation/solde", async function(request, response) {
    // console.log(request.body.conversation.id);
    // Get  data from API synchronously.
    try {
     //let urlServiceOrangeMoneyOperation :  URLAPI + "services/orangemoney";  

      var dataOrangemoneyReturn = "Le solde de votre compte est de 75950.00 FCFA. Comment envoyer de l'argent a un proche qui n'a pas Orange Money ? Generer juste un code de retrait au #144*1#.";
      
      replyMsg = [{
        type: "text",
        delay: 1,
        content: dataOrangemoneyReturn
      }];
     // if (recastEntities["solde"]) {}

        //Format data
       // var dataOrangemoneyReturn = dataOrangemoneyReturn.compte.solde;

        //Return data
        
        function timeout(ms) {
           return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function sleep(fn, ...args) {
           await timeout(5000);
         
             //Response
             response.send({
              replies: replyMsg,
              conversation: {
                memory: {}
              }
            });       
        }

        sleep()         
        //setTimeOut(fonctionAExecuter, 5000);


    

    } catch (err) {
      console.error("Error :" + err);
    }
  });


  //=====ORANGE MONEY=====//
}

//===================We export our route to outside================
module.exports = { configOrangeMoneyRoutes: configOrangeMoneyRoutes };

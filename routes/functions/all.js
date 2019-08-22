
//get all data sent by user from recast
        
exports.all = app.all("/*", function(request, response, next) {
            //Get all variable value from recast
            recastMemory = request.body.conversation.memory;
            //Get id from recast
            //recastConversationId = request.body.conversation.Id;
            //Get intent from recast
            recastIntents = request.body.nlp.intents;
            if (recastIntents) {
              console.log(recastIntents[0].slug);
            }
            //Get entities from recast
            recastEntities = request.body.nlp.entities;
            console.log(recastEntities);
            console.log(recastEntities);
            //console.log(recastEntities.raw);
        
            next();
          });
      

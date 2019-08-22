
const axios = require("axios");
//=============We get value from our API : API CONSUME======================

var getData = function(url) {
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


  //===================We export our route to outside================
module.exports = {

   getData: getData 
   
};
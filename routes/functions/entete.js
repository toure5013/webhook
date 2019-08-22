/*
 * routes.js
 */

"use strict";

//=============We export our module using require======================

  const axios = require("axios"),
  moment = require("moment");
//=============We declare our variable======================
var configRoutes,
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


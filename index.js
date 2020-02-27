"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var amount =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.amount
      ? req.body.queryResult.parameters.amount
      : "Seems like some problem. Speak again.";
  
  var date =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.paydate
      ? req.body.queryResult.parameters.paydate
      : "Seems like some problem. Speak again.";
  
  var speech = "Thank you! I have made of note of your payment of Rs. "+amount+"on "+date;
  
  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };
  
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

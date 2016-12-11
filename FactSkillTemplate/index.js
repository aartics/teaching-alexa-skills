'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.2c3812c4-6e4f-427a-9ea2-efb0ce384e63"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'harti grocery';

/**
 * Array containing grocery facts.
 */
var FACTS = [
    "Fish is very perishable. It is best to use or freeze fish the day you purchase it.",
    "Fresh cheeses such as cream cheese, queso fresco, fromage blanc are typically OK up to about 2 weeks after the sell by date.",
    "The US has not legislated any sell-by dates for dairy products in the US.",
    "The concept of food labeling as we know it today didn't really begin until the 1930's.",
    "Soft drinks in glass or plastic bottles should not be stored in sunlight.",
    "Dry goods such as sugar, salt, flour really don't have any expiration dates and in fact they are rarely dated at all. All of these products remain wholesome for several years if stored in a cool dry location."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random grocery fact from the grocery facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a grocery fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
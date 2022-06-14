var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const configFileName = './config.json';
var config = require(configFileName);
const commandsFileName = './commands.json';
var commands = require(commandsFileName);
const fs = require('fs');
const { time } = require('console');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: false
});

//try {
//    bot.connect();
//} catch (error) {
//    console.error(error);
//}


let bot_id = config.id;
let users = config.users;
let new_users = new Array();
let toxic_responses = config.toxic_responses;
let question_responses = config.question_responses;
let names_1 = config.names_1;
let names_2 = config.names_2;
let names_3 = config.names_3;
let names_4 = config.names_4;

function getCurrentDateTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}

function is_new_user(userID) {
    for (let i = 0; i < users.length; i++) {
        // Checks if user is already in config.json file and returns false if they are
        if (users[i].userID == userID) {
            return false;
        }
    }
    for (let i = 0; i < new_users.length; i++) {
        // Checks if user has already been added to users.log file in this session
        if (new_users[i] == userID) {
            return false;
        }
    }
    // If user is not in these places, returns true
    return true;
}

function checkIfOp(userID) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userID == userID) {
            return users[i].op;
        }
    }
    return false;
}

function log_message(user, userID, channelID, message) {
    console.log(getCurrentDateTime()); // logs current date / time 
    console.log(user + " - " + userID); // logs username and user ID
    console.log("in " + channelID); // logs Channel ID
    console.log(message); // logs received message
    // if (is_new_user(userID)) {
    //     // if user flagged as New by the function, log in the users.log file
    //     var content = user + ", " + userID + "\n";
    //     const newUser = {name: user, userID: userID, op: false, toxic_responses: []};
    //     config.users.push(newUser);
    //     fs.writeFile(configFileName, JSON.stringify(config, null, 2), function writeJSON(err) {
    //         if (err) return console.log(err);
    //         console.log(JSON.stringify(newUser));
    //         console.log('writing to ' + configFileName);
    //     });
    //     fs.appendFile('users.log', content, err => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       //done!
    //     })
    //     new_users.push(userID);
    //     console.log("Logged new user %s", user);
    // }
}

function send_message(channelID, messageText) {
    // send messageText to channelID
    bot.sendMessage({
        to: channelID,
        message: messageText
    });
    console.log("Sent %s",messageText);
    console.log("----------")
}

function getRandomInt(max) {
    // returns a random int between 0 and max 
    return Math.floor(Math.random() * max);
}

function getCommand(command) {
    // Returns command from commands.json, otherwise returns null
    console.log("Checking command: %s...", command);
    if (commands.hasOwnProperty(command)) {
        var commandText = commands[command];
        console.log("Command found!");
        return commandText;
    } else {
        console.log("Command not valid\n----------")
        return null;
    }
}


function addCommand(command, commandText) {
    // This function will add a command to the json file
    if (commands.hasOwnProperty(command)) {
        return false;
    } else {
        commands[command] = commandText;
        // fs.writeFile(commandsFileName, JSON.stringify(commands, null, 2), function writeJSON(err) {
        //     if (err) return console.log(err);
        //     console.log(JSON.stringify(commands));
        //     console.log('writing to ' + commandsFileName);
        // });
        return true;
    }
}


function toxic_message(channelID, userID) {
    // Bot sends a random message in response to user command
    console.log("Sending some toxic shit...")
    var special_responses = [];
    // assigns a random message from the toxic_responses array in config.json
    var messageText = toxic_responses[getRandomInt(toxic_responses.length)];

    // check if user exists, and if so, could send custom response:
    for (let i = 0; i < users.length; i++) {
        if (users[i].userID == userID && users[i].toxic_responses) {
            special_responses = users[i].toxic_responses;
        }
    }
    if ((special_responses) && !(getRandomInt(10))) {
        console.log("Special responses for this user!")
        messageText = special_responses[getRandomInt(special_responses.length)];
    }
    send_message(channelID, messageText);
}

function answer_question(channelID) {
    // Bot sends a random answer in response to user question
    console.log("Question asked, generating answer...")
    var messageText = question_responses[getRandomInt(question_responses.length)];
    send_message(channelID, messageText)
}

function generate_baby_name() {
    // Random name generation
    var name_1 = names_1[getRandomInt(names_1.length)];
    var name_2 = names_2[getRandomInt(names_2.length)];
    var name_3 = names_3[getRandomInt(names_3.length)];
    var name_4 = "";
    if (getRandomInt(10) == 0) {
        name_4 = names_4[getRandomInt(names_4.length)];
    }
    return name_1+name_2+name_3+name_4;
}

function send_name(channelID) {
    // Bot generates and sends a baby name
    console.log("Name request, generating baby name...")
    var messageText = generate_baby_name();
    send_message(channelID, messageText)
}

function roll(msg) {
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] < 9 && msg[i] > 0) {
          
        }
    }
}

function roll_helper() {
  
}

async function asyncConnect() {
    logger.info('Connecting...');
    const result = await bot.connect();
    logger.info(result);
}

asyncConnect();

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('disconnect', (errorMsg, code) => {
    if (code === 1000) {
        logger.info('Reconnecting...');
        asyncConnect();
    }
    else {
        logger.info('Bot Disconnected');
        logger.info(`Error Message: ${errorMsg}`);
        logger.info(`Error Code: ${code}`);
        logger.info(typeof code);
    }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        // Commands starting with !
        // console.log(evt);
        log_message(user, userID, channelID, message);
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var messageText;
        args = args.splice(1);
        switch(cmd) {
            // !commands below!
            case 'toxic':
                // Sends a truly toxic message
                toxic_message(channelID, userID);
                break;
            case 'roll':
                // Rolls a die
                var result = roll(args.join(' '));
                send_message(channelID, "jesus fucking christ pal, how'd you learn about this???");
                break;
            case 'ask':
            case 'question':
                // Answers a yes/no question
                if (args[0]) {
                    answer_question(channelID);
                } else {
                    send_message(channelID, "ask A QUWestION!!!! > : (((");
                }
                break;
            case 'name':
                // Generates baby name
                send_name(channelID);
                break;
            case 'addCommand': // Add new commands with static responses
                var newCmd = args[0]; // first word after !addCommand is the new command
                args = args.splice(1); // 
                var cmdText = args.join(' ');
                if (!(checkIfOp(userID))) {
                    console.log("Unauthorized Use");
                    send_message(channelID, "NOT ALLOWWWWWED");
                } else if (newCmd == "addCommand") {
                    console.log("Can't create addCommand");
                    send_message(channelID, "BAD BAD BAD BAD BAD!!! BAD!!! NO!!!!");
                } else if (!(args[0])) {
                    console.log("Invalid command usage");
                    send_message(channelID, "what will I SAY ! ! :)");
                } else if (addCommand(newCmd,cmdText)) {
                    console.log("Added command !%s: %s", newCmd, cmdText);
                    messageText = "hhhhhhhhhh commmmmmmand addeeeeeedddd: !"+newCmd;
                    send_message(channelID, messageText);
                } else {
                    console.log("Command !%s already exists!", newCmd);
                    send_message(channelID, "thaAT's a BAD COmmand!!!!! We HAVVE IT ALREADY");
                }
                break;
            // Add additional case commands here
            default:
                // Check if command is a custom command
                var cmdText = getCommand(cmd);
                if (cmdText) {
                    send_message(channelID,cmdText);
                }
                // else will ignore the user
         }
    } else if((message.includes(bot_id) || (!(evt.d.hasOwnProperty('member')))) && (userID != bot_id)) {
        // Activates when bot is @'d or DM'd
        log_message(user, userID, channelID, message);
        toxic_message(channelID, userID);
    } else if(evt.d.hasOwnProperty('member') && !(message.includes('||'))) { // respond if ANY message contains a specific word in it 
        messageText = ""
        for (property in config.reactions) {
            var newMsg = message.replace(/[^a-zA-Z0-9]/g, "");
            var lowerCaseMsg = newMsg.toLowerCase();
	    if (lowerCaseMsg.includes(property)) {
                log_message(user, userID, channelID, message);
                console.log("SECRET MESSAGE!");
                messageText += config.reactions[property]+" ";
                send_message(channelID,config.reactions[property]);
                if (userID == bot_id && property == "worm") {
                    setTimeout(() => {  
                        send_message(channelID,"...");
                        console.log("HE WORMED HIMSELF OH NO!!"); 
                    }, 1000);
                    setTimeout(() => {  
                        send_message(channelID,"I wourmed mY SELF ! ! :cry:");
                        console.log("time to be sad :("); 
                    }, 3000);
                }
            }
        }
    }
});

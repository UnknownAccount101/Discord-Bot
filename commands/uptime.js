const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
  let totalSeconds = bot.uptime / 1000
  let days = Math.floor(totalSeconds / 86400)
  let hours = Math.floor(totalSeconds / 3600)
  totalSeconds % 3600
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = Number.parseInt(totalSeconds % 60)
  
  let displayDay = `${days} Day`
  let displayHour = `${hours} Hour`
  let displayMinute = `${minutes} Minute`
  let displaySecond = `${seconds} Second`
  
  if(days == 0) displayDay == ""
  else if (days > 1) displayDay += "s, "
  else displayDay == ", "
  
  if(hours == 0) displayHour == ""
  else if (hours > 1) displayHour += "s, "
  else displayHour == ", "
  
  if(minutes == 0) displayMinute == ""
  else if (minutes > 1) displayMinute += "s, "
  else displayMinute == ", "
  
  if(seconds == 0) displaySecond = 0
  else if (seconds > 1) displaySecond == "s"
  
  let uptime = `${displaySecond}, ${displayMinute}, ${displayHour}, ${displayDay}`
  message.channel.send(`:watch: **Bot Uptime:** ${uptime}`);

}

module.exports.help = {
  name: "uptime"
}

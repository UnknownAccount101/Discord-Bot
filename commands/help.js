const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  message.delete();

  let sicon = bot.user.displayAvatarURL;
  let hEmbed = new Discord.RichEmbed()

  .setThumbnail(sicon)
  .setColor("RANDOM")

  .addField('Information', '**+serverinfo** - Server information.\n **+botinfo** - Bot information.\n **+userinfo** - User information.\n **+server** - Checks any server.\n')
  .addField('User Commands', '**+pages** - List of pages.\n **+report** - Report a user.\n **+uptime** - Displays the uptime of the bot.\n')
  .addField('Moderation', '**+mute** - Mute a user.\n **+unmute** - Unmute a user.\n **+warn** - Warn a user.\n **+warns** - Check user warns.\n **+kick** - Kick a user.\n **+ban** - Ban a user.\n **+say** - Say a message.\n **+clear** - Clear certain messages.\n')
  .addField('Administration', '**+poll** - Create a poll.\n **+dm** - Message all users.\n **+send** - Send a message to a specific user.\n **+setgame** - Set game status.\n **+setstatus** - Set activity.\n **+prefix** - Changes the prefix.\n **+addrank** - Adds a role.\n **+removerank** - Removes a role.\n')
  .addField('Tickets', '**+new** - Create a ticket.\n **+close** - Close a ticket.\n')
  .addField('Fun', '**+coinflip** - Flip a coin.\n **+diceroll** - Roll a dice.\n')
  .addField('Economy', '**+coins** - Check your coins.\n')

  message.author.send(hEmbed);
}

module.exports.help = {
    name: "help"
}

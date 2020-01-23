const Discord = require('discord.js');

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (client, message, args, tools) => {
  
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(Embed1);
  
    let pollmessage = args.join(" ").slice(22);
    let pollchannel = message.mentions.channels.first();

    if (!pollchannel) {
        return message.reply("**ERROR:** Please mention the channel!")
    }

    if (!pollmessage) {
        return message.reply("**ERROR:** Please state a poll.")
    }

    let embed = new Discord.RichEmbed()
        .addField("**POLL:**", `${pollmessage}`)
        .setFooter(`Poll Made By ${message.author.tag}`)
    pollchannel.send({
        embed
    }).then(msg => {
        msg.react("✅").then(r => msg.react("❎"))
    });
  
}

module.exports.help = {
  name: "poll"
}
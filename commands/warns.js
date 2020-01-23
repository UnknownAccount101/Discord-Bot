const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./Data/warnsData.json", "utf8"));

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")

module.exports.run = async (bot, message, args) => {
  
    message.delete();
  
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send(Embed).then(msg => {msg.delete(5000)})
  
    let wicon = wUser.displayAvatarURL;
    let totalWarns = warns[wUser.id].warns;
  
    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    }
  
    let warnsEmbed = new Discord.RichEmbed()
    
    .setColor("RANDOM")
    .setThumbnail("https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Ambox_warning_pn.svg/1178px-Ambox_warning_pn.svg.png")
    .setTitle("Checking Total Warns")
    .addField("Checked User", wUser)
    .addField("Total Warns", totalWarns)

    message.channel.send(warnsEmbed).then(msg => {msg.delete(15000)})

}

module.exports.help = {
  name: "warns"
}
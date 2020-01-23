const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./Data/warnsData.json", "utf8"));

let Embed = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "User not found! Make sure you are @mentioning the user!")

let Embed1 = new Discord.RichEmbed() 

.setColor("RED")
.addField("**ERROR**", "You do not have the proper permissions to do this!")

module.exports.run = async (bot, message, args) => {

    message.delete();
  
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(Embed1).then(msg => {msg.delete(5000)})

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send(Embed).then(msg => {msg.delete(5000)})
    if(wUser == message.author) return message.reply("**ERROR:** You cannot warn yourself!").then(msg => {msg.delete(5000)})
    if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("**ERROR:** That user cannot be warned!").then(msg => {msg.delete(5000)})
  
    let wReason = args.join(" ").slice(22);
    if(!wReason) return message.channel.send("**ERROR:** No reason provided for warning " + (wUser)).then(msg => {msg.delete(5000)})    
      
  
    // Add warns
  
    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./Data/warnsData.json", JSON.stringify(warns, null, 2), (err) => {
        if (err) console.log(err)
    });

    let sicon = bot.user.displayAvatarURL;
    let warnEmbed = new Discord.RichEmbed()

      .setColor("#ffffff")
      .setThumbnail(sicon)
      .setTitle("User Warned!")
      .addField("Warned User:", `${wUser} with ID: ${wUser.id}`)
      .addField("Warned In:", message.channel)
      .addField("Warned By:", `${message.author} with ID: ${message.author.id}`)
      .addField("Reason:", wReason)
      .setTimestamp()
      .setFooter('When');

    let warnChannel = message.guild.channels.find("name", "staff-logs");
    if(!warnChannel) return message.channel.send("I need the logs channel ID!").then(msg => {msg.delete(10000)})
    
    var mention = message.mentions.users.first();

    message.channel.send(wUser + " has been warned!").then(msg => {msg.delete(10000)});
    mention.sendMessage(`You have been warned for **${wReason}**. Please refrain breaking this rule again.`);
  
    warnChannel.send(warnEmbed);
  
      if(warns[wUser.id].warns == 3){
      let muterole = message.guild.roles.get("");
      if (!muterole) return message.reply("I need the mute rank ID! Please send it to Trixkz#6637!")

      if(wUser.roles.has(muterole.id)) return message.channel.send("**ERROR:** " + (wUser) + " is already muted!").then(msg => {msg.delete(10000)})
        
      await (wUser.addRole(muterole.id));
      message.channel.send(wUser + " has been muted after being warned **3** times!").then(msg => {msg.delete(10000)})

  }

    if(warns[wUser.id].warns == 5){
     message.guild.member(wUser).kick(wReason);
     message.channel.send(wUser + " has been kicked after being warned **5** times!").then(msg => {msg.delete(10000)})    
        
    }
  
    if(warns[wUser.id].warns == 10){
     message.guild.member(wUser).ban(wReason);
     message.channel.send(wUser + " has been *banned* after being warned **10** times!").then(msg => {msg.delete(10000)})    
        
  }
  
}

module.exports.help = {
  name: "warn"
}

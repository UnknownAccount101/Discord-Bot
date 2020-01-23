const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const botconfig = require("./botconfig.json");

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve,ms)
  })
}

bot.commands = new Discord.Collection();

// ---------------------------------------------------------------------------------------------------------------

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("There are no commands to load...");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

// ---------------------------------------------------------------------------------------------------------------

bot.on("message", message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
    
  // let prefix = botconfig.prefix
  let messageArray = message.content.trim().split(" ");
  let cmd = messageArray.shift();
  let args = messageArray;

  if (!message.content.startsWith(prefix)) return;
  var argresult = args.join(' ');


  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args)

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  
  // ---------------------------------------------------------------------------------------------------------------
  
  var coins = require("./coins.json");

  let coinAmount = Math.floor(Math.random() * 15) + 1;
  let baseAmount = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmount} ; ${baseAmount}`);

  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    };
  }

  if (coinAmount === baseAmount) {
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmount
    };

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
     if (err) console.log(err);
    });

    let Embed = new Discord.RichEmbed()

    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .addField("💸", `${coinAmount} Coins Added!`);

    message.channel.sendMessage(Embed);

  }
  
  // ---------------------------------------------------------------------------------------------------------------
  
});
  
bot.login(process.env.token);

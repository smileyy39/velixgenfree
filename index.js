const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs')	
let settings = JSON.parse(fs.readFileSync(__dirname+"/settings.json"));	
let prefix = settings['prefix'];	
let cooldown = settings['cooldown']	
const generated = new Set();	


bot.on("ready", () => {	
    console.log(`Logged in as ${bot.user.tag}!`);	
    console.log("prefix is",prefix,"\nCooldown is",cooldown)
});	

bot.on("message", async message => {	
    prefix = settings['prefix'];	
    cooldown = settings['cooldown']	
    if (message.author.bot) return;	
    var command = message.content	
    .toLowerCase()	
    .slice(prefix.length)	
    .split(" ")[0];	
	
	    if (command === "restock") {	
		if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin / restocker!");	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        let data;	
        if (!args[0])	
            return message.reply("Please, specify the service you restocked!");	
		
        try{	
            data = JSON.parse(fs.readFileSync(__dirname + "/" + args[0] + ".json"))	
            message.channel.send("@everyone")	
			message.channel.send("Restocked: " + args[0])	
			message.channel.send("Restocked Numbers: " + args[1])
            message.channel.send("Restocked By: " + "Me")


        } catch {	
const embed = new Discord.MessageEmbed()
  .setTitle("Invalid answer")
  .setAuthor("Vilex Gen - account generator")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("The service you provided was invalid!")
  .setFooter("")
  .setImage("https://media.discordapp.net/attachments/777871560374485022/777904740277288970/logo-glitched.gif")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.gg/hGMjhRvSnz")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  /*
   * Blank field, useful to create some space.
   */
   
  message.channel.send(embed);	
        } 	
    }
	
	
    if (command === "check") {	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        let data;	
        if (!args[0])	
            return message.reply("Please, specify the service you want!");	
		
        try{	
            data = JSON.parse(fs.readFileSync(__dirname + "/" + args[0] + ".json"))	
            message.channel.send("There are "+data.length+" accounts in "+args[0])	

        } catch {	
const embed = new Discord.MessageEmbed()
  .setTitle("Invalid answer")
  .setAuthor("Vilex Gen - account generator")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("The service you provided was invalid!")
  .setFooter("")
  .setImage("https://media.discordapp.net/attachments/777871560374485022/777904740277288970/logo-glitched.gif")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.gg/hGMjhRvSnz")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  /*
   * Blank field, useful to create some space.
   */
   
  message.channel.send(embed);	
        } 	
    }


    if (command === "gen") {	
        if(message.channel.id !== "777980804324130826") return message.channel.send("This command can only be ran in generator!")	

        if (generated.has(message.author.id)) {	
            message.channel.send("Wait before generating another account!. - " + message.author);	
        } else {	

            let messageArray = message.content.split(" ");	
            let args = messageArray.slice(1);	
            if (!args[0]) return message.reply("Please, specify the service you want!");	
            let data;	
            try{	
                data = fs.readFileSync(__dirname + "/" + args[0].toLowerCase() + ".json")	

            } catch{	
                return message.reply(args[0].toLowerCase()+' service do not exists')  	
            } 	
            let account = JSON.parse(data)	
                if (account.length <= 0) return message.reply("The service you provided is out of stock!")
const embed = new Discord.MessageEmbed()
  .setTitle("Account generated")
  .setAuthor("Vilex Gen - account generator")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("The account for your requested service has been sent as DM!")
  .setFooter("")
  .setImage("https://media.discordapp.net/attachments/777871560374485022/777904740277288970/logo-glitched.gif")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.gg/hGMjhRvSnz")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  /*
   * Blank field, useful to create some space.
   */
   
  message.channel.send(embed);
                	
                await generated.add(message.author.id);	
                await message.author.send({embed: {	
                    "title": "Account details",	
                    "color": 3066993,	
                    "fields": [	
                      {	
                        "name": "Email",	
                        "value": account[0].email	
                      },	
                      {	
                        "name": "Password",	
                        "value": account[0].password	
                      }	
                    ]	
                  }	
                })	
                await message.author.send("Copy-Paste: "+account[0].email+":"+account[0].password)	
                account.splice(0,1)	
                console.log(account)	
                fs.writeFileSync(__dirname + "/" + args[0] + ".json", JSON.stringify(account));	
                setTimeout(() => {	
                    generated.delete(message.author.id);	
                }, cooldown);	
        }	
    }	
	
    if (command === "change"){	
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        try{	
            settings[args[0].toLowerCase()] = args[1].toLowerCase()	
            fs.writeFileSync(__dirname+"/settings.json", JSON.stringify(settings));	
            message.reply(args[0]+" changed to "+args[1])	

        } catch{	
            message.reply("An error occured")	
        }	
    }		

    if(command === "add") {	
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        var acc = args[1].split(":");	

        fs.readFile(__dirname + "/" + args[0].toLowerCase() + ".json",function(err, data) { 	
        if(err){	
            let newnewData = 	
            [{	
                "email":acc[0],	
                "password":acc[1]	
            }]	
            try {	
                fs.writeFileSync(__dirname + "/" + args[0].toLowerCase()+".json", JSON.stringify(newnewData))	
const embed = new Discord.MessageEmbed()
  .setTitle("Service added and account added")
  .setAuthor("Vilex Gen - account generator")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("The service and account for your requested service has been added!")
  .setFooter("")
  .setImage("https://media.discordapp.net/attachments/777871560374485022/777904740277288970/logo-glitched.gif")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.gg/hGMjhRvSnz")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  /*
   * Blank field, useful to create some space.
   */
   
  message.channel.send(embed);
            } catch {	
                message.channel.send('**Error** Cannot create service and add that account!')	

            }	
        }	

        else {	
            let newData = {"email":acc[0],"password":acc[1]}	
            data = JSON.parse(data)	
            try{	
                data.push(newData)	
                fs.writeFileSync(__dirname + "/" + args[0].toLowerCase()+".json", JSON.stringify(data))	
const embed = new Discord.MessageEmbed()
  .setTitle("Account added")
  .setAuthor("Vilex Gen - account generator")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("The account for your requested service has been added!")
  .setFooter("")
  .setImage("https://media.discordapp.net/attachments/777871560374485022/777904740277288970/logo-glitched.gif")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.gg/hGMjhRvSnz")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  /*
   * Blank field, useful to create some space.
   */
   
  message.channel.send(embed);
            } catch {	
                message.channel.send('**Error** Cannot add that account!')	
            }	
        }	
    }); 	
}	

if(command === "help") {	
    if (!message.member.hasPermission("ADMINISTRATOR")) {	
        message.channel.send({embed: {	
        "title": "Commands",	
        "color": 1127848,	
        "fields": [	
          {	
            "name": prefix+"gen SERVICENAME",	
            "value": "generate an account of that service."	
          },	
          {	
            "name": prefix+"check SERVICENAME",	
            "value": "check how many accounts are in that server."	
          },	
          {	
            "name": prefix+"stock",	
            "value": "check the services and the accounts.."	
          }	
        ]	
      } 	

    })	
} else {	
        message.channel.send({embed: {	
        "title": "Generator Commands",	
        "color": 3066993,	
        "fields": [	
          {	
            "name": "Generate accounts",	
            "value": "Example: +gen (Name of the Service)"	
          },	
          {	
            "name": "(admin) Create a service",	
            "value": "+create (Name of the Service)"	
          },	
          {	
            "name": "(admin) Notify account restocks",	
            "value": "Example: +restock (Name of the Service) (Number of Account(s)"	
          },	
          {	
            "name": "(admin) Add accounts",	
            "value": "Example: +add (Name of the Service) (mail:pass)"	
          },	
          {	
            "name": "View what commands you can gen on Velix",	
            "value": "Example: +help"	
          }	
        ]	
      }	

    })	
}	
}	
})	

bot.login(process.env.TOKEN);
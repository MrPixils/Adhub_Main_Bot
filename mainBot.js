const Discord = require('discord.js');
var openDB = require('json-file-db');
// Create an instance of a Discord client
const client = new Discord.Client();

const config = require('./config.json');
// The token of your bot - https://discordapp.com/developers/applications/me
const token = config.token;

const prefix = config.prefix;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"


  if(message.content.startsWith(prefix + 'testcommand'))
  {
    message.channel.send("This is how messages *should* look!");
  }
  if (message.content.startsWith(prefix + 'ping')) {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
  if(message.content.startsWith(prefix + 'shutdown'))
  {
    if(!message.author.id == "118455061222260736")
    {
      message.channel.send("Nice try m8");
    }else
    {
      client.destroy();
    }
  }
  if(message.content.startsWith(prefix + 'ban'))
  {
    if(!message.member.roles.some(r=>["DC | Admin", "AdHub | Board of Directors"].includes(r.name)) )    
    {
      message.channel.send("You do not have permissions to ban");
    }else
    {
      message.guild.ban(message.mentions.members.first());
    }
  }
  if(message.content.startsWith(prefix + 'mute'))
  {
    if(!message.member.roles.some(r=>["DC | Moderators", "DC | Admin", "AdHub | Board of Directors"].includes(r.name)) )    
    {
      message.channel.send("You do not have permissions to mute");
    }else
    {
      var role = message.guild.roles.find(val => val.name == "Adhub-Mute");
      message.guild.members.find(val => val.id == message.author.id).addRole(role);
    }
  } 
  if(message.content.startsWith(prefix + 'unban'))
  {
    if(!message.member.roles.some(r=>["DC | Admin", "AdHub | Board of Directors"].includes(r.name)) )    
    {
      message.channel.send("You do not have permissions to unban");
    }else
    {
      message.guild.unban(message.mentions.members.first());
    }
  }
  if(message.content.startsWith(prefix + 'unmute'))
  {
    if(!message.member.roles.some(r=>["DC | Moderators", "DC | Admin", "AdHub | Board of Directors"].includes(r.name)) )    
    {
      message.channel.send("You do not have permissions to unmute");
    }else
    {
      var role = message.guild.roles.find(val => val.name == "Adhub-Mute");
      message.guild.members.find(val => val.id == message.author.id).removeRole(role);
    }
  }   
  if(message.content.startsWith(prefx + 'apply'))
  {
    if(message.content.split(' ').length == 3)
    {
      client.fetchInvite(message.content.split(' ')[1]).then(g => {
        try {
          message.channel.send(g.guild.name);
          var channy = message.guild.channels.find(val=>val.id == "400003339187781642");
          channy.send(g.guild.name + "\n" + message.author + "\n" + g + "\n" + message.content.split(' ')[2]);
        }catch(err)
        {
          message.reply(" sorry the code you provided is not valid.");
        }    
      });
    
    }
  }
  if(message.content.startsWith(prefix + 'review'))
  {
    //var add = openDB("review.json");
    if(!message.member.roles.some(r=>["DC | Advertiser", "AdHub | Board of Directors"].includes(r.name)) )
    {
      return message.reply(" you do not have permissions to perform this command");
    }
    var arr = message.content.split(' ');
    if(arr.length <= 3)
    {
      return message.reply(" sorry, incorrect arguments");
    }
    var revie = "";
    for(var i = 3; i<arr.length; i++)
    {
        revie += arr[i];
        if(arr.length - 1 != i)
            revie += " ";
    }
    
    if(coolDownArr.indexOf(message.author.id) >= 0)
    {
      return message.reply(" please wait before executing this command again.");
    }

    var chan = message.guild.channels.find(val => val.name == message.mentions.channels.first().name);
    client.fetchInvite(message.content.split(' ')[1]).then(g => {
      chan.send(revie + "\n" + g);
      coolDownArr.push(message.author.id);
      setTimeout(function()
      {
        var index = coolDownArr.indexOf(message.author.id);
        if (index >= 0) {
          arr.splice( index, 1 );
        }
      }, 30000)
      
    });
  }   
});

// Log our bot in
client.login(token);

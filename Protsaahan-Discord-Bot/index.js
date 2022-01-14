const { Client, Intents } = require('discord.js');
const fetch = require("node-fetch");
const keepAlive = require("./server");
require("dotenv").config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const mySecret = process.env['TOKEN'];

const sadWords = ["sad", "depressed", "unhappy", "angry"];

const protsaahans = [
    "Cheer up!",
    "Hang in there.",
    "You are a great person / bot!"
]

function getQuote(){
    return fetch("https://zenquotes.io/api/random")
    .then(res => {
        return res.json();
    })
    .then((data) => {
      return data[0]["q"] + " -" + data[0]["a"]; 
    });
}

client.on("ready", () => {
    console.log(`Logged is as ${client.user.tag}!`);
});


client.on("message", (msg) => {
    if(msg.author.bot) return
    if(msg.content === "$inspire"){
        getQuote().then(quote => msg.channel.send(quote));
    }

    if(sadWords.some(word => msg.content.includes(word))){
        const protsaahan = protsaahans[Math.floor(Math.random()*3)]
        msg.reply(protsaahan);
    }
});

keepAlive();
client.login(mySecret);


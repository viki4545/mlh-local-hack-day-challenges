const { text } = require("express");
const express = require("express");
const app = express();
const Instagram = require("instagram-web-api");
const FileCookieStore = require("tough-cookie-filestore2");
const cron = require("node-cron");
const WordPOS = require("wordpos");
const wordPos = new WordPOS();
require("dotenv").config;
const port = process.env.PORT || 4000;

cron.schedule("20 4 * * *", async () => {
    const cookieStore = new FileCookieStore("./cookies.json");

const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD,
    cookieStore
},
{
    language: "en-US",
});

const instagramPostFunction = async () => {
    wordPos.randAdjective({count: 1}, async (result) => {
        const resultWord = result[0].replace("_", " ");
        const newDesc = resultWord.slice(result[0].length - 3) === "ing"
                        ? resultWord : "feeling " + resultWord;
    });
    const newCaption = `Vicky is ${newDesc} today.\nAre you ${newDesc}?\nLet him know in comment!\n ${replace(
        /_|'/g,""
        )} #Vicky`;
    await client.uploadPhoto({
        photo: "./images/bg-image.jpg",
        caption: newCaption,
        post: "feed",
    }).then(async (res) => {
        const media = res.media;
        console.log(`https://instagram.com/p/${media.code}`);

        await client.addComment({
            mediaId: media.id,
            text: "#instagood,#photooftheday,#fashion,#beautiful,#happy,#cute,#tbt"
        });
    });
};

const loginFunction = async () => {
    console.log("Logging in.....");
    
    await client.login().then(()=> {
        console.log("Login successful !");
        instagramPostFunction();
    }).catch((err) => {
        console.log("Login failed!");
        console.log(err);
    })
};
});



app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
})

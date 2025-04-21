const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const reactions = [
    "airkiss", "angrystare", "bite", "bleh", "blush", "brofist", "celebrate",
    "cheers", "clap", "confused", "cool", "cry", "cuddle", "dance", "drool",
    "evillaugh", "facepalm", "handhold", "happy", "headbang", "hug", "huh",
    "kiss", "laugh", "lick", "love", "mad", "nervous", "no", "nom", "nosebleed",
    "nuzzle", "nyah", "pat", "peek", "pinch", "poke", "pout", "punch", "roll",
    "run", "sad", "scared", "shout", "shrug", "shy", "sigh", "sip", "slap",
    "sleep", "slowclap", "smack", "smile", "smug", "sneeze", "sorry", "stare",
    "stop", "surprised", "sweat", "thumbsup", "tickle", "tired", "wave",
    "wink", "woah", "yawn", "yay", "yes"
];

app.get('/', async (req, res) => {
    try {
        let reaction = req.query.reaction;
        
        if (!reaction) {
            return res.status(400).json({ error: "put a 'reaction' query." });
        }
        
        if (reaction === "random") {
            reaction = reactions[Math.floor(Math.random() * reactions.length)];
        }
        
        if (!reactions.includes(reaction)) {
            return res.status(400).json({ error: "invalid reaction" });
        }
        
        const response = await axios.get(`https://api.otakugifs.xyz/gif?reaction=${reaction}&format=gif`);
        const gifUrl = response.data.url;
        
        const imageResponse = await axios.get(gifUrl, { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/png');
        res.send(imageResponse.data);
        
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch GIF" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const { Client } = require("discord.js");
const arrayOfStatus = [
    'Bot Official Of Rumah Kedua.',
    'Bot Backup',
    '/helps',
]

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("The Bot Is Now Online")
        setInterval(() => {
            client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)]}], status: "idle"})
        }, 4000)
    }
}
const { Client } = require("discord.js");
const arrayOfStatus = [
    'Bot Official Of Rumah Kedua.',
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
        console.log("BOT ONLINE");
        setInterval(() => {
            client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)]}], status: "idle"})
        }, 4000)
    }
}
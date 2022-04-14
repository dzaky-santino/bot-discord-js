const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("DARK_GOLD")
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
        **Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/948476755012878376/DyMX6h0oGyRABPfCGhfu50Z9MrQHib5ujT8_XnvWOetJ0TTQTwamo6xn5SDVozbwRy-E"}
        ).send({embeds: [Log]}).catch((err) => {console.log(err)});
    } 
}
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "remind",
    description: "Set a reminder!",
    permission: "SEND_MESSAGES",
    usage: "/remind",
    options: [
        {
            name: "time",
            description: "Set the time.",
            required: true,
            type: "INTEGER"
        },
        {
            name: "description",
            description: "Set the info of the reminder.",
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const time = interaction.options.getInteger("time");
        const desc = interaction.options.getString("description")
        const channel = interaction.channel.id;

        const Response = new MessageEmbed()
        .setTitle("Done!")
        .setDescription(`I will remind you in ${time}min(s) for ${desc}`)
        .setColor("GREEN")

        interaction.reply({embeds: [Response], ephemeral: true})
        await wait(time * 1000 * 60)
        // Comment : If you want hours then in line 38 after * 60 add (*60) so it will become hours
        interaction.followUp(`<@${interaction.user.id}> You wanted me to remind you for ${desc}. \n The time is up!`)


    }
}
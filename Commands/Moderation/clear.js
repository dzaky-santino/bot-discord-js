const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Deleting A Certain Number Of Messages From A Channel Or Member",
    permission: "MANAGE_MESSAGES",
    usage: "/clear",
    options: [
        {
            name: "amount",
            description: "Select The Number Of Messages To Be Deleted From The Channel Or Member",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select Members To Delete Their Messages",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })
            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`${messages.size} Message Removed From ${Target} `);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`${messages.size} Messages Removed From This Channel <a:sparkle:797761560474157106>`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}
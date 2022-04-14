const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Menghapus Sejumlah Pesan Tertentu Dari Channel Atau Member",
    permission: "MANAGE_MESSAGES",
    usage: "/clear",
    options: [
        {
            name: "amount",
            description: "Pilih Jumlah Pesan yang Akan Dihapus Dari Channel Atau Member",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Pilih Member Untuk Menghapus Pesan Mereka",
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
                Response.setDescription(`${messages.size} Pesan Dihapus Dari ${Target} <a:sparkle:797761560474157106>`);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`${messages.size} Pesan Dihapus Dari Channel Ini <a:sparkle:797761560474157106>`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}
const  { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "nick",
    description: "Mengubah Nama Panggilan Member",
    usage: "/nick",
    permission: "MANAGE_NICKNAMES",
    options: [
        {
            name: "target",
            description: "Pilih Target",
            type: "USER",
            required: true 
        },
        { 
            name: "nickname",
            description: "Ketik Nama Yang Ingin Diinginkan",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { options } = interaction;
        const target = options.getMember("target");
        const nick = options.getString("nickname");

        target.setNickname(nick)

        const Embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<a:Centang:819524821053997086> Berhasil Mengubah Nama Member Menjadi ${nick}`)
        interaction.reply({embeds: [Embed]})
    }
}
const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "cat",
    description: "Mengirim Gambar Kucing.",
    usage: "/cat",
    /**
     * 
     * @param { MessageEmbed } message
     * @param { CommandInteraction } interaction
     */
    async execute(interaction) {

        const url = "https://some-random-api.ml/img/cat/";

        let data, response;

        try{
            response = await axios.get(url);
            data = response.data;
        }catch (e) {
            return interaction.channel.send(`An error occured, please try again!`)
        }

        const kitten = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Random Cat")
        .setImage(data.link)

        await interaction.reply({ embeds: [kitten]}) //.then(msg => { setTimeout(() => msg.delete(), 10000) })
    }
}
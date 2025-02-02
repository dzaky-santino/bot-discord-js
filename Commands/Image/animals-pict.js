const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "animals-pict",
    description: "Gives You A Picture Of An Animal.",
    permission: "SEND_MESSAGES",
    options: [
        {
        name: "name",
        description: "Name Of The Animal",
        type: "STRING",
        required: true
        }
    ],

    /**
     * 
     * @param { MessageEmbed } message
     * @param { CommandInteraction } interaction
     */
    async execute(interaction) {
        const { options } = interaction;

        const animalName = options.getString("name")

        let url = `https://some-random-api.ml/img/${animalName}/`;

        let data, response;

        try{
            response = await axios.get(url);
            data = response.data;
            const animals = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`Random ${animalName}`)
            .setImage(data.link)
            await interaction.reply({ embeds: [animals]}) //.then(msg => { setTimeout(() => msg.delete(), 10000) })

        }catch (e) {
            return interaction.reply({ content: `An error occured, please try again <:icons_exclamation:859388127885131796>`, ephemeral: true });
            
    }}
}
const { CommandInteraction, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: "weather",
    description: "Weather Info",
    permission: "SEND_MESSAGES",
    usage: "/weather",
    options: [
        {
            name: "location",
            description: "Enter A Location",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){
    const loc = interaction.options.getString("location");

    weather.find({search: loc, degreeType: "C"}, function(error, result){
        
        const errEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("**⛔ You Did Not Specify A Valid Location**")

        if (result === undefined || result.length === 0) return interaction.reply({embeds: [errEmbed]});
        let current = result[0].current
        let location = result[0].location


        const embed = new MessageEmbed()
      .setTitle(`Show Weather Info for ${current.observationpoint}`)
      .setDescription(current.skytext)
      .setThumbnail(current.imageUrl)
      .setColor("ORANGE")
      .setTimestamp()
      .addField("Temperature", current.temperature + "°C", true)
      .addField("Wind Velocity", current.winddisplay, true)
      .addField("Humidity", `${current.humidity}%`, true)
      .addField("Time Zone", `UTC${location.timezone}`, true)

      interaction.reply({embeds: [embed]})
    })

    }
}
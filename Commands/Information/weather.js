const { CommandInteraction, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: "weather",
    description: "Info Cuaca",
    usage: "/weather",
    options: [
        {
            name: "location",
            description: "Enter a location",
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
        .setDescription("**⛔ Anda tidak menentukan lokasi yang valid**")

        if (result === undefined || result.length === 0) return interaction.reply({embeds: [errEmbed]});
        let current = result[0].current
        let location = result[0].location


        const embed = new MessageEmbed()
      .setTitle(`Menampilkan Info Cuaca untuk ${current.observationpoint}`)
      .setDescription(current.skytext)
      .setThumbnail(current.imageUrl)
      .setColor("ORANGE")
      .setTimestamp()
      .addField("Suhu", current.temperature + "°C", true)
      .addField("Kecepatan Angin", current.winddisplay, true)
      .addField("Kelembaban", `${current.humidity}%`, true)
      .addField("Zona Waktu", `UTC${location.timezone}`, true)

      interaction.reply({embeds: [embed]})
    })

    }
}
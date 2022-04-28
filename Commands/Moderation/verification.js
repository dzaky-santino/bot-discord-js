const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  
  name: "verification",
  description: "verification member",
  permission: "ADMINISTRATOR",

   async execute (interaction) {

    const { guild } = interaction;

    const VERIFICATION = "836890741211922472"
    
    const Embed = new MessageEmbed()

    .setTitle("✅ | Verification")
    .setDescription("Click the button to verify yourself!")
    .setColor("GREEN")

    const Row = new MessageActionRow()

    .addComponents(
      
      new MessageButton()
      .setStyle("SUCCESS")
      .setCustomId("verification")
      .setLabel("Verify")
      .setEmoji("✅")
      
    );

    await guild.channels.cache.get(VERIFICATION).send({ embeds: [Embed], components: [Row] })

    interaction.reply({ content: "✅ | verification completed successfully.", ephemeral: true })
    
   }
};
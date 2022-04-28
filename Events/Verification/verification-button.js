const { CommandInteraction } = require("discord.js");

  module.exports = {
    
    name: "interactionCreate",

    async execute (interaction) {
      
     if(interaction.isButton()) {
     if(interaction.customId === "verification") {
      
      interaction.reply({ content: `<@${interaction.user.id}>, successfully verified!`, ephemeral: true })

      const Unverified = ""

      var Roles = [
          "778378833056235541" // You can add the number of roles you want
      ]
      
      await interaction.member.roles.add(Roles)
      await interaction.member.roles.remove(Unverified)
      
      }
    }
  }
};
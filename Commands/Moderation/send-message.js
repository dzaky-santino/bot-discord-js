const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "send-message",
  description: "Kirim Pesan Ke Channel Tertentu.",
  usage: "/send-message",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "message",
      description: "The message that you want to be sent.",
      type: "STRING",
      required: true,
    },
    {
      name: "channel",
      description: "Select a channel to send the embed to.",
      type: "CHANNEL",
      required: false,
      channelTypes: ["GUILD_TEXT"],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    
    const { options } = interaction;

    const message = options.getString("message") || "none";
    const gChannel = options.getChannel("channel") || interaction.channel;

    if (message === "none") {interaction.reply({embeds: [new MessageEmbed().setColor("RED").setTitle("Error ❌").setDescription("Please set a message to be sent!")]})};  //Checking message exists just incase the a field is somehow passed through/
    const sendMessage = await client.channels.cache.get(gChannel.id).send(message);

    interaction.reply({embeds: [new MessageEmbed().setColor("WHITE").setDescription(`The message was successfully sent to ${gChannel} <a:Centang:819524821053997086>`)],ephemeral: true});
  },
};

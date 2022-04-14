const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invit Bot Ke Server",
    usage: "/invite",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
      
        const Invite = new MessageEmbed()
        .setTitle("Invite Me!")
        .setDescription("Bot Official Dari Server Rumah Kedua. \nGunakan Tombol Dibawah Untuk Mengundang Bot Ke Servermu. \nAtau Bergabung Dengan Server Kami!\n\n**TERIMA KASIH** <a:alove:773903405138706433><a:alove:773903405138706433><a:alove:773903405138706433>")
        .setColor("RANDOM")
        .setThumbnail(client.user.displayAvatarURL())

        const cButtons = new MessageActionRow();
        cButtons.addComponents(
            new MessageButton().setURL("https://discord.com/api/oauth2/authorize?client_id=831070305031159848&permissions=8&scope=bot%20applications.commands").setLabel("Invite Me").setStyle("LINK"),
            //new MessageButton().setURL("https://discord.gg/qnsRSa6p3m").setLabel("Join Server").setStyle("LINK"),
            new MessageButton().setURL("https://saweria.co/RumahKedua").setLabel("Support Server").setStyle("LINK"),
            //new MessageButton().setURL("https://top.gg/servers/773365807417524249/vote").setLabel("Vote Server").setStyle("LINK"),
        );

        return interaction.reply({embeds: [Invite], components: [cButtons]})
        
    }
  };
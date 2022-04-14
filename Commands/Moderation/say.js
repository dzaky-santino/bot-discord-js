const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "say",
	description: "Buat Bot Mengatakan Apa yang Anda Inginkan!",
	usage: "/say",
    permission: "MANAGE_MESSAGES",
	cooldown: 10000,
	options: [{
		name: "message",
		description: "Berikan Pesan yang Anda Ingin Dikirim oleh Bot!",
		type: "STRING",
		required: true
	}],

	/**
	 * @param {ClientInteraction} interaction
	 */
	execute(interaction) {

		const say = interaction.options.getString("message")

		if (say.length > 1024) return interaction.reply({
			embeds: [new MessageEmbed().setTitle("❌ Can't Run Code With The Strings Given ❌").setColor("RED")
				.setDescription("Message Can't Be More Than 1024 Characters")
			],
			ephemeral: true
		});

		const Response = new MessageEmbed()
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: `Your Message:`,
				value: say
			})
			.setFooter({ text: `Requested By: ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL({dynamic: true, size: 512})})

		interaction.reply({embeds: [Response]});
	}
}
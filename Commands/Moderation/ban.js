const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "ban",
	description: "Ban Member",
	permission: "BAN_MEMBERS",
	usage: "/ban",
	options: [{
			name: "user",
			description: "Choose Member To Ban",
			type: "USER",
			required: true
		},
		{
			name: "reason",
			description: "Give A Reason For The Member To Be Banned",
			type: "STRING",
			required: true
		},
		{
			name: "messages",
			description: "Give Number Ff Days To Delete Member Message",
			type: "STRING",
			required: true,
			choices: [{
					name: "Don't Delete Any",
					value: "0"
				},
				{
					name: "Delete Up To Seven Days",
					value: "7"
				}
			]
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const options = interaction.options
		const target = options.getMember("user");
		const user = interaction.member
		const name = interaction.commandName
		const reason2 = "Invalid Permissions"
		const per = this.permission

		const Embed1 = new MessageEmbed()
			.setTitle("❌ Error Running Command ❌")
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: "Command:",
				value: name
			}, {
				name: "Reason:",
				value: reason2
			}, {
				name: "Needed Permissions:",
				value: per
			})

		if (!user.permissions.has("BAN_MEMBERS"))
			return interaction.reply({
				embeds: [Embed1],
				ephemeral: true
			}).catch((err) => {
				console.log(err)
			});


		if (target.id === interaction.member.id)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
					.setDescription("Why Are You Trying To Ban Yourself??").setTimestamp()
				],
				ephemeral: true
			});

		if (target.permissions.has("BAN_MEMBERS"))
			return interaction.reply({
				embeds: [new MessageEmbed().setColor("RED").setDescription("❌ You Can't Ban An Admin ❌")]
			});


		const reason = options.getString("reason");

		if (reason.length > 512)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Can't Run Code With The Strings Given ❌").setColor("RED")
					.setDescription("Reason Can't Be More Than 512 Characters").setTimestamp()
				],
				ephemeral: true
			});
		target.send(
			new MessageEmbed()
			.setTitle(` You've Been Banned From ${interaction.guild.name}!`)
			.setColor("RED")
			.setTimestamp()
			.addFields({
				name: "Reason For Ban:",
				value: reason
			}, {
				name: "Banned By:",
				value: interaction.member.user.tag
			})
		)
		const Amount = options.getString("messages")

		target.ban({
			days: Amount,
			reason: reason
		})

		interaction.reply({
			embeds: [new MessageEmbed().setColor("GREEN").setDescription(`<a:Centang2:949513455877103666> **${target.user.username}** Has Been Banned From ${interaction.guild.name} <a:Centang2:949513455877103666>`)],
			ephemeral: false

		})
	}
}
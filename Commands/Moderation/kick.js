const {CommandInteraction,MessageEmbed} = require("discord.js");

module.exports = {
	name: "kick",
	description: "Kick Member",
	permission: "KICK_MEMBERS",
	usage: "/kick",
	options: [{
			name: "user",
			description: "Choose Member To Kick",
			type: "USER",
			required: true
		},
		{
			name: "reason",
			description: "Give Reasons For Members To Kick",
			type: "STRING",
			required: true
		},
		{
			name: "messages",
			description: "Give Number of Days To Delete Member Message",
			type: "STRING",
			required: false,
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

		if (!user.permissions.has("KICK_MEMBERS"))
			return interaction.reply({
				embeds: [Embed1],
				ephemeral: true
			}).catch((err) => {
				console.log(err)
			});


		if (target.id === interaction.member.id)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
					.setDescription("Why Are You Trying To Kick Yourself??").setTimestamp()
				],
				ephemeral: true
			});

		if (target.permissions.has("KICK_MEMBERS"))
			return interaction.reply({
				embeds: [new MessageEmbed().setColor("RED").setDescription("❌ You Can't Kick An Admin ❌")]
			});


		const reason = options.getString("reason");

		if (reason.length > 512)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Can't Run Code With The Strings Given ❌").setColor("RED")
					.setDescription("Reason Can't Be More Than 512 Characters").setTimestamp()
				],
				ephemeral: true
			});

		const DMEmbed = new MessageEmbed()
			.setTitle(`<a:righter_arrow:797761109846523914> You've Been Kicked From ${interaction.guild.name}`)
			.setColor('RED')
			.setTimestamp()
			.addFields({
				name: "Reason:",
				value: reason
			}, {
				name: "Kicked By:",
				value: interaction.member.user.tag
			}, );

		await target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});

		const Amount = options.getString("messages");

		target.kick({
			days: Amount,
			reason: reason
		})

		interaction.reply({
			embeds: [new MessageEmbed().setColor("GREEN").setDescription(`**${target.user.username}** Has Been Kicked From ${interaction.guild.name} <a:Centang2:949513455877103666>`)],
			ephemeral: false
		});

	}
}
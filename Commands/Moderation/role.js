const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "role",
    description: "Manage Member Roles",
    usage: "/role",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "type",
            description: "Whether To Remove Or Add A Role",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "add",
                    value: "add"
                },
                {
                    name: "remove",
                    value: "remove"
                },
            ]
        },
        {
            name: "role",
            description: "Provide A Role To Add Or Remove",
            type: "ROLE",
            required: true
        },
        {
            name: "target",
            description: "Provide A User To Manage",
            type: "USER",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const type = options.getString("type");
        const role = options.getRole("role");
        const target = options.getMember("target")
        
        const error = new MessageEmbed()
            .setColor("RED")
            .setTitle("<:icons_exclamation:859388127885131796> Role Management <:icons_exclamation:859388127885131796>")
            .setDescription("❗ There was an error.")

        const success = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("<:icons_djoin:875754472834469948> Role Management <:icons_dleave:875754473023229972>")
            .setDescription("<a:Centang:819524821053997086> Successful")

        switch(type) {
            case "add" : {
                if(target.roles.cache.has(role.id)) {
                    error.addField("Error:", `${target} already has the ${role} role!`);
                    error.addField("Reason:", "You cannot add the role to a user when they already have it.")
                    interaction.reply({embeds: [error]});
                } else {
                    target.roles.add(role);
                    success.addField("Result:", `Added the ${role} role to ${target}.`)
                    interaction.reply({embeds: [success]})
                }
            }
            break;
            case "remove" : {
                if(!target.roles.cache.has(role.id)) {
                    error.addField("Error:", `${target} does not have the ${role} role!`);
                    error.addField("Reason:", "You cannot remove a role from a user when they do not have it.")
                    interaction.reply({embeds: [error]})
                } else {
                    target.roles.remove(role);
                    success.addField("Result:", `Removed the ${role} role from ${target}.`)
                    interaction.reply({embeds: [success]})
                }
            }
            break;
        }
    }
}
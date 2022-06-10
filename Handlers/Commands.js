const {Perms} = require("../Validation/Permissions");
const {Client} = require("discord.js");
const {promisify} = require("util");
const {glob} = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

/**
 * 
 * @param {Client} client 
 */
module.exports = async(client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "❌ FAILED", "MISSING A NAME")

        if(!command.description)
        return Table.addRow(command.name, "❌ FAILED", "MISSING A DESCRIPTION")

        if(!command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "❌ FAILED", "PERMISSION IS INVALID")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);
        
        await Table.addRow(command.name, "✔ SUCCEED");
    });

    console.log(Table.toString());

    // PERMISSION CHECK
    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get("773365807417524249");
        mainGuild.commands.set(CommandsArray);
    });
}
//     client.on("ready", async () => {
//         client.guilds.cache.forEach((g) => {
//             g.commands.set(CommandsArray).then(async (command) => {
//                 const Roles = (commandName) => {
//                     const cmdPerms= CommandsArray.find(
//                         (c) => c.name === commandName
//                     ).permission;
//                     if(!cmdPerms) return null;

//                     return g.roles.cache
//                         .filter((r) => r.permissions.has(cmdPerms) && !r.managed)
//                         .first(10);
//             };
        
//             const fullPermissions = command.reduce((accumulator, r) => {
//                 const roles = Roles(r.name);
//                 if(!roles) return accumulator;

//                 const permissions = roles.reduce((a, r) => {
//                     return [...a, {id: r.id, type: "ROLE", permission: true}];
//                 }, []);

//                 return [...accumulator, {id: r.id, permissions}];
//             }, []);

//             await g.commands.permissions.set({ fullPermissions });
//         })
//     })
// })}
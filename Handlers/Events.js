const {Events} = require("../Validation/EventNames");
const {promisify} = require("util");
const {glob} = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

module.exports = async (client) => {
    const Table = new Ascii("Events Loaded");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `❗ Event Name Is Either Invalid Or Missing: ${L[L.length - 2]}/${L[L.length - 1]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "✔ SUCCEED")
    });

    console.log(Table.toString());
}
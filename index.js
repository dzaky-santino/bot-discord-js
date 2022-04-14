const {Client, Collection} = require("discord.js");
const client = new Client({intents: 32767});
const {Token} = require("./config.json")

const {promisify} = require("util");
const Ascii = require("ascii-table");
const {glob} = require("glob");
const PG = promisify(glob);

client.commands = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const {YtDlpPlugin} = require("@distube/yt-dlp");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin(),
        new YtDlpPlugin()
    ]
});
module.exports = client;

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);
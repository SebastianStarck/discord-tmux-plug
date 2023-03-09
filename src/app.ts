import {config} from "dotenv";
import {Client} from "discord.js";
import {commands} from "./commands/commandController";

config();
const prefix = process.env.PREFIX;

const client: Client = new Client();
client.login(process.env.DISCORD_API_KEY);


// BOT STARTS RUNNING

client.once("ready", () => {
    console.log(`League Bot is Running`);
});


//BOT READ MESSAGES FROM CHANNELS
client.on("message", async (message) => {

    if (message.content.startsWith(prefix)) {
        const messageDividedInArguments = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName: string = messageDividedInArguments[0];
        const command = searchCommand(commandName);
        if (command) {
            return await command.action(client, message);
        }
    }
})


function searchCommand(commandName: string): any {
    let command: any;
    commands.forEach((actualCommand: any) => {
        if (actualCommand.name == commandName || actualCommand.alias.includes(commandName)) {

            command = actualCommand;
        }
    })
    return command;
}
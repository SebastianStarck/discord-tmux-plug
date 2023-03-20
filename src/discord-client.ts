import {
  Client,
  CommandInteraction,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { commands, getCommand } from "./services/command.service";
import { pick } from "lodash";

export class DiscordClient {
  private client: Client;

  public async init(token: string, clientId: string) {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    await this.registerCommands(token, clientId);
    await client.login(token);

    client.once("ready", () => {
      console.log(`Discord bot is Running`);
    });

    this.client = client;
    this.registerSlashCommandInteraction();
    return this;
  }

  private async registerCommands(token: string, clientId: string) {
    const commandsNameAndDescription = commands.map((command) =>
      pick(command, ["name", "description"])
    );

    const rest = new REST({ version: "10" }).setToken(token);
    await rest.put(Routes.applicationCommands(clientId), {
      body: commandsNameAndDescription,
    });

    console.log("Registered commands successfully");
  }

  private registerSlashCommandInteraction() {
    this.client.on(Events.InteractionCreate, this.handleInteraction);
  }

  private async handleInteraction(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = getCommand(interaction.commandName);

    if (!command) {
      await interaction.reply("Command not found");
    }

    await command.execute(interaction);
  }
}

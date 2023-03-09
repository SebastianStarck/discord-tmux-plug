import { Command } from "../models/Command";

export const ping: Command = {
  name: "ping",
  alias: [],
  description: "This command return PONG when PING",
  action: (interaction) => interaction.reply('PONG'),
};

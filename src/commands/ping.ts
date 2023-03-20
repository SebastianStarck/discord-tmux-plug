import { CommandDefinition } from "../models/Command";

const ping: CommandDefinition = {
  name: "ping",
  alias: [],
  description: "This command return PONG when PING",
  action: (interaction) => interaction.reply("PONG"),
};

export default ping;
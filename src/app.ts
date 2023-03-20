import { config } from "dotenv";
import { DiscordClient } from "./discord-client";
import { TmuxService } from "./services/tmux.service";
import { scoutCommands } from "./services/command.service";

export let env;
export let tmuxService: TmuxService;
try {
  config();
  env = process.env;

  tmuxService = new TmuxService();
  scoutCommands();
  new DiscordClient().init(env.DISCORD_API_KEY, env.CLIENT_ID);
} catch (err) {
  console.log(err);
}

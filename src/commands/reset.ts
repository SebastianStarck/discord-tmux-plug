import { CommandDefinition } from "../models/Command";
import { getRunningJobs } from "../services/node.service";
import { tmuxService } from "../app";

async function waitForServer() {
  const getServerIsAlive = async () => {
    const jobs = await getRunningJobs(
      "ps -ef | grep start-server.sh",
      "su - pzuser"
    );

    return jobs.length > 0;
  };

  let serverIsAlive = true;
  while (serverIsAlive) {
    serverIsAlive = await getServerIsAlive();

    if (!serverIsAlive) {
      break;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}

const reset: CommandDefinition = {
  name: "reset",
  alias: [],
  description: "This command will reset the server",
  action: async (interaction) => {
    try {
      const jobs = await getRunningJobs(
        "ps -ef | grep start-server.sh",
        "su - pzuser"
      );

      if (jobs.length === 0) {
        return interaction.reply("No active server found");
      }

      await tmuxService.runCommandToSession("pz", "quit");
      await interaction.reply("Quiting server...");
      await waitForServer();
      await interaction.reply("Starting server...");
      await tmuxService.runCommandToSession(
        "pz",
        "/opt/pzserver/start-server.sh"
      );
      await interaction.reply("Server restarted successfully");
    } catch (err) {
      console.log(err);
    }
  },
};

export default reset;

import { Tmux, tmux } from "node-tmux";
import { runShellCommand } from "../util";

export class TmuxService {
  private instance: Tmux;

  public async runCommandToSession(sessionName: string, command: string) {
    const tmuxSession: Tmux = await this.getInstance();

    if (!tmuxSession) {
      throw new Error("Tmux session not found.");
    }

    try {
      console.log(`Running command to ${sessionName}: ${command}`);

      await tmuxSession.writeInput(sessionName, command, true);
    } catch (err) {
      console.log(err);
    }
  }

  public async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    await runShellCommand("su - pzuser");
    return tmux()
      .then((tm) => {
        this.instance = tm;

        return tm;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

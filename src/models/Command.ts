import { CommandInteraction } from "discord.js";

export type CommandDefinition = {
  name: string;
  description: string;
  action: (interaction: CommandInteraction) => void;
  alias?: string[];
};

export class Command {
  name: string;
  alias: string[];
  description: string;
  private action: (interaction: CommandInteraction) => void;

  constructor({ name, alias, description, action }: CommandDefinition) {
    this.name = name;
    this.alias = alias;
    this.description = description;
    this.action = action;
  }

  public execute(interaction: CommandInteraction) {
    try {
      this.action(interaction);
    } catch (err) {
      console.log(err);
      interaction.reply("Something went wrong!");
    }
  }
}

import { reset } from "../commands/reset";
import { ping } from "../commands/ping";

export const getCommand = (commandName: string) => {
  return commands.find(
    (command) =>
      command.name == commandName || command.alias.includes(commandName)
  );
};

export const commands: any = [reset, ping];

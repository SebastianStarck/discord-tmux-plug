import { Command } from "../models/Command";
import * as fs from "fs";
import * as path from "path";

interface DefaultExports {
  [key: string]: any;
}

export let commands: any = [];

export const scoutCommands = () => {
  const commandsPath = path.resolve(__dirname + "/../commands");
  const commands = getDefaultExportsFromFolder(commandsPath);

  Object.entries(commands).forEach(([_, command]) =>
    console.log(`Found command: ${command.name}`)
  );
};

export const getCommand = (commandName: string): Command => {
  const commandDefinition = commands.find(
    (command) =>
      command.name == commandName || command.alias.includes(commandName)
  );

  return new Command(commandDefinition);
};

function getDefaultExportsFromFolder(folderPath: string): DefaultExports {
  const defaultExports: DefaultExports = {};

  const files = fs.readdirSync(folderPath);

  files.forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);

    if (fs.statSync(filePath).isFile() && fileName.endsWith(".js")) {
      const fileExports = require(filePath).default;

      if (fileExports !== undefined) {
        defaultExports[fileName] = fileExports;
      }
    }
  });

  return defaultExports;
}

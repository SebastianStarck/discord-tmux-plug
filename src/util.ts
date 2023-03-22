import {commands} from "./services/command.service";

const { exec } = require('child_process');

export function runShellCommand(command): Promise<string> {
    console.log(`Running command: ${command}`);

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            if (stderr) {
                reject(stderr);
                return;
            }

            resolve(stdout);
        });
    });
}
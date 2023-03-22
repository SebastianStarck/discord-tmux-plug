import { runShellCommand } from "../util";

interface Job {
  uid: string;
  pid: string;
  ppid: string;
  c: string;
  styme: string;
  tty: string;
  time: string;
  cmd: string;
}

export async function getRunningJobs(
  jobName: string,
  commandPrefix?: string
): Promise<Job[]> {
  let command = `ps -ef | grep ${jobName}`;
  if (commandPrefix) {
    command = `${commandPrefix} "${command}"`;
  }

  const output: string = await runShellCommand(command);
  return output.split(/\r?\n/).map((line) => {
    const [uid, pid, ppid, c, styme, tty, time, ...rest] = line.split(/\s+/);

    return {
      uid,
      pid,
      ppid,
      c,
      styme,
      tty,
      time,
      cmd: rest.join(" "),
    };
  });
}

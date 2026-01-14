import { Command } from "./command";

export class CommandExecutor {
  async run(command: Command): Promise<void> {
    try {
      await command.execute();
    } catch (err) {
      console.error("Command failed:", err);
    }
  }
}

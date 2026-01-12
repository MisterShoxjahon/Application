import { Command } from "./command";

export class CommandExecutor {
    async run(command: Command) {
        await command.execute()
    }
}

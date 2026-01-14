// to run the application, run the command: npx ts-node src/app.ts
import { CommandExecutor } from "./core/command.executer";
import { Context } from "./core/context";
import { StorageSingleton } from "./storage/storage.singleton";
import { AddEntryCommand } from "./commands/add-entry.command";
import { ShowEntriesCommand } from "./commands/show-entries.common";
import { DeleteEntryCommand } from "./commands/delete-entry.command";
import { EditEntryCommand } from "./commands/edit-entry.command";
import select from "@inquirer/select";
import input from "@inquirer/input";
import { StatsEntryCommand } from "./commands/stats.command";

const content = new Context(StorageSingleton.getInstance());
const executor = new CommandExecutor();

async function bootstrap() {
  while (true) {
    const action = await select({
      message: "What do you want to do?",
      choices: [
        { name: "New memorization record", value: "add" },
        { name: "Show all records", value: "show" },
        { name: "Delete", value: "delete" },
        { name: "Edition", value: "edit" },
        { name: "Statistics", value: "stats" },
        { name: "Exit", value: "exit" },
      ],
    });

    switch (action) {
      case "add":
        await executor.run(new AddEntryCommand(content));
        break;
      case "show":
        await executor.run(new ShowEntriesCommand(content));
        break;
      case "delete":
        await executor.run(new DeleteEntryCommand(content));
        break;
      case "edit":
        await executor.run(new EditEntryCommand(content));
        break;
      case "stats":
        await executor.run(new StatsEntryCommand(content));
        break;
      case "exit":
        return;
    }

    await input({ message: "Press Enter to continue..." });
  }
}

bootstrap();

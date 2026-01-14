import { Command } from "@/core/command";
import { Context } from "@/core/context";

export class ShowEntriesCommand implements Command {
  constructor(private context: Context) {}

  async execute(): Promise<void> {
    const data = this.context.storage.load();

    if (data.length === 0) {
      console.log("No entries found");
      return;
    }

    console.log("Your memorization progress:");
    data.forEach((entry, index) => {
      console.log(
        `#${index + 1}, ${entry.surah}, (${entry.fromAyah} - ${
          entry.toAyah
        }) - ${entry.date}`
      );
    });
  }
}

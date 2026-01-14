import { Command } from "@/core/command";
import { Context } from "@/core/context";
import select from "@inquirer/select";
import input from "@inquirer/input";

export class EditEntryCommand implements Command {
  constructor(private context: Context) {}

  async execute(): Promise<void> {
    const data = this.context.storage.load() ?? [];

    if (data.length === 0) {
      console.log("No entries found");
      await input({ message: "Press Enter to return to menu..." });
      return;
    }

    const index = await select({
      message: "Select an entry to edit:",
      choices: data.map((entry, idx) => ({
        name: `${entry.surah} (${entry.fromAyah}-${entry.toAyah}) - ${entry.date}`,
        value: idx,
      })),
    });

    if (index === undefined || index < 0 || index >= data.length) {
      console.log("Invalid selection");
      await input({ message: "Press Enter to return to menu..." });
      return;
    }

    const entry = data[index];

    const surah = await input({
      message: `Enter Surah name (${entry.surah}):`,
      default: entry.surah,
    });

    const fromAyah = await input({
      message: `From Ayah (${entry.fromAyah}):`,
      default: String(entry.fromAyah),
      validate: (v) => (!isNaN(Number(v)) ? true : "Please enter a number"),
    });

    const toAyah = await input({
      message: `To Ayah (${entry.toAyah}):`,
      default: String(entry.toAyah),
      validate: (v) => (!isNaN(Number(v)) ? true : "Please enter a number"),
    });

    data[index] = {
      ...entry,
      surah: surah.trim() || entry.surah,
      fromAyah: Number(fromAyah),
      toAyah: Number(toAyah),
    };

    this.context.storage.save(data);
    console.log("Entry updated successfully");

    await input({ message: "Press Enter to return to menu..." });
  }
} 

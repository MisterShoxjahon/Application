import fs from "fs";
import path from "path";
import { StorageStrategy } from "./storage.strategy";
import { MemorizationProgress } from "@/types/types";

const filePath = path.join(__dirname, "../../data/progress.json");

export class JSONStorage implements StorageStrategy {
  load(): MemorizationProgress[] {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error("Failed to parse JSON file:", err);
      return [];
    }
  }
  save(data: MemorizationProgress[]): void {
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}

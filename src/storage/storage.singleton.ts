import { StorageFactory } from "./storage.factory";
import { StorageStrategy } from "./storage.strategy";

export class StorageSingleton {
  private static instance: StorageStrategy;

  static getInstance(): StorageStrategy {
    if (!this.instance) {
        this.instance =  StorageFactory.create('json')
    }
    return this.instance
  }
}

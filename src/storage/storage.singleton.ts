export class StorageSingleton {
  private static instance: StorageSingleton;

  static getInstance(): StorageSingleton {
    if (!this.instance) {
        this.instance =  new StorageSingleton()
    }
    return this.instance
  }
}

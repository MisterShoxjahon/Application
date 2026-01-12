import { MemorizationProgress } from "@/types/types";

export interface StorageStrategy {
    load(): MemorizationProgress[]
    save(data: MemorizationProgress[]): void
}
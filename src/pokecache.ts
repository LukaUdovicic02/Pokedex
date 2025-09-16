export type CacheEntry<T> = {
    createdAt: number
    val: T
}

export class Cache {
    private cache = new Map<string, CacheEntry<any>>()
    private reapIntervalId: NodeJS.Timeout | undefined = undefined
    private interval: number;

    constructor(interval: number) {
        this.interval = interval
        this.startReapLoop()
    }

    add<T>(key: string, val: T) {
        this.cache.set(key, { createdAt: Date.now(), val })
    }

    get<T>(key: string):T | undefined {
        const entry = this.cache.get(key);
        return entry?.val as T | undefined;
    }

    private reap() {
        const cutoff = Date.now() - this.interval;
        for (const [key, entry] of this.cache) {
            if (entry.createdAt < cutoff) this.cache.delete(key);
        }
    }

    private startReapLoop() {
        const interval = setInterval(() => {
            this.reap()
        }, this.interval)

        this.reapIntervalId = interval
    }

    stopReapLoop() {
        if(this.reapIntervalId)
            clearInterval(this.reapIntervalId)
        this.reapIntervalId = undefined
    }


}
import { expect, test } from "vitest";
import { Cache } from "../pokecache.js";

test.concurrent.each([
    {
        key: "https://pokeapi.co/api/v2",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://pokeapi.co/api/v2/location-area",
        val: "moretestdata",
        interval: 1000, // 1 second
    },

])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
})

test.concurrent.each([
    {
        key: "https://pokeapi.co/api/v2",
        val: "testdata",
        interval: 500,
    }

])("Testing get() and set()", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    expect(cache.get(key)).toBe(undefined);

    cache.add("random", val)
    expect(cache.get("random")).toBe(val)

    cache.add("random123", val)
    cache.add("random123", val)
    expect(cache.get("random123")).toBe(val)

    cache.stopReapLoop();
})

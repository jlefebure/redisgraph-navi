import { writable } from 'svelte/store';

export let host = writable("127.0.0.1");
export let port = writable(6379);
export let connectionSuccessful = writable(false);
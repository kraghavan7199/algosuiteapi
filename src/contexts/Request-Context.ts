import { AsyncLocalStorage } from "async_hooks";

interface RequestContext {
    user?: { id: string };
}

export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export function setRequestContext(user: { id: string }) {
    const store = asyncLocalStorage.getStore();
    if (store) store.user = user;
}

export function getRequestContext(): RequestContext | undefined {
    return asyncLocalStorage.getStore();
}
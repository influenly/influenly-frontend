import { Injectable } from '@angular/core';

export const LOCAL_STORAGE_KEYS = {
    token: 'token'
}

@Injectable()
export class LocalStorageService {

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}
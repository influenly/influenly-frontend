// Dependencies
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import StorageService from './storage.service';


@Injectable()
export class SessionStorageService extends StorageService {

	private _storage = sessionStorage;

	constructor() {
		super();
	}

	protected get storage(): Storage {
		return this._storage;
	}

	set(key: string, value: any) {
		super.setItem(key, value);
	}
	
	get(key: string): Observable<any>|undefined {
		return super.getItem(key);
	}

	remove(key: string) {
		super.removeItem(key);
	}

	add(item: string, key: string, value: any) {
		super.getItem(item)?.pipe(take(1)).subscribe(
			res => {
				let map = res;
				if (res == null || map == "") {
					map = new Map();
				}
				map.set(key, value);
				super.setItem(item, map);
			}
		);
	}

}

export const SESSION_STORAGE_KEYS = {
	token: 'token',
};
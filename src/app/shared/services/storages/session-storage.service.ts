// Dependencies
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
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

	async getFirst(key: string): Promise<any> {
		let response = undefined;
		const obs = super.getItem(key);
		if (obs) {
			response = await firstValueFrom(obs);
		}
		return response;
	}

}

export const SESSION_STORAGE_KEYS = {
	token: 'token',
	user_type: 'user_type',
	user_id: 'user_id'
};
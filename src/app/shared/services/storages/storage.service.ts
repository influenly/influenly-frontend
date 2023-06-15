import { Observable, BehaviorSubject } from 'rxjs';

abstract class StorageService {

	private subjects: Map<string, BehaviorSubject<any>> = new Map();

	protected abstract get storage(): Storage;

	constructor() {	}

	protected setItem(key: string, value: any): void {
		this.storage.setItem(key, value);
		if (this.subjects.has(key))
			this.subjects.get(key)?.next(value);
	}

	protected getItem(key: string, defaultValue: any = null): Observable<any>|undefined {
		if (this.subjects.has(key))
			return this.subjects.get(key);
		if (!this.storage.getItem(key) && defaultValue)
			this.storage.setItem(key, defaultValue);
		this.subjects.set(key, new BehaviorSubject(this.storage.getItem(key) ? this.storage.getItem(key) : defaultValue));
		return this.subjects.get(key);
	}

	protected removeItem(key: string): void {
		this.storage.removeItem(key);
		if (this.subjects.has(key)) {  
			this.subjects.get(key)?.next(null);
			this.subjects.get(key)?.complete();
			this.subjects.delete(key);
		}
	}

	clear() {
		this.storage.clear();
		this.subjects.forEach((subject: BehaviorSubject<any>) => {
			subject.next(null);
			subject.complete();
		});
		this.subjects.clear();
	}
	
}

export default StorageService;
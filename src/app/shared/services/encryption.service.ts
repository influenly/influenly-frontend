import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private key: CryptoKey | undefined;
  private isInitialized = false;

  constructor() { }

  async initialize() {
    if (!this.isInitialized) {
      const key = 'InFlU3nLy2024!!?';
      await this.importKey(key);
      this.isInitialized = true;
    }
  }

  private async importKey(key: string): Promise<void> {
    const keyData = new TextEncoder().encode(key);

    if (keyData.length !== 16 && keyData.length !== 32) {
      throw new Error('AES key data must be 128 or 256 bits');
    }

    this.key = await crypto.subtle.importKey(
        'raw', 
        keyData, 
        { name: 'AES-CBC' }, 
        false, 
        ['encrypt', 'decrypt']
    );
  }

  async encrypt(id: string): Promise<string> {
    await this.initialize();
    if (!this.key) {
        throw new Error('The encryption service has not been initialized');
    }

    const buffer = new TextEncoder().encode(id);
    const iv = crypto.getRandomValues(new Uint8Array(16));

    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv },
      this.key,
      buffer
    );

    const combinedBuffer = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combinedBuffer.set(iv, 0);
    combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.length);

    return btoa(String.fromCharCode.apply(null, Array.from(combinedBuffer)));
  }

  async decrypt(encryptedId: string): Promise<string> {
    await this.initialize();
    if (!this.key) {
        throw new Error('The encryption service has not been initialized');
    }

    const combinedBuffer = new Uint8Array(atob(encryptedId).split('').map(c => c.charCodeAt(0)));
    const iv = combinedBuffer.slice(0, 16);
    const encryptedBuffer = combinedBuffer.slice(16);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      this.key,
      encryptedBuffer
    );

    return new TextDecoder().decode(decryptedBuffer);
  }
}
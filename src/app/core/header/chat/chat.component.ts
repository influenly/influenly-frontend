import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  isChatOpened: boolean = false
  token: string|undefined;

  chatClosedEventSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
    private router: Router,
    private chatService: ChatService) {
  }

  ngOnInit() {
    this.getToken();
    this.chatClosedEventSubs = this.chatService.getChatClosedEvent().subscribe(() => this.isChatOpened = false);
  }

  private async getToken() {
    const tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token);
    if (tokenSubs) {
      this.token = await firstValueFrom(tokenSubs);
    }
  }

  openChat() {
    this.isChatOpened = true;
    this.router.navigate(['app/chat']);
  }

  ngOnDestroy() {
    if (this.chatClosedEventSubs) this.chatClosedEventSubs.unsubscribe();
  }

}

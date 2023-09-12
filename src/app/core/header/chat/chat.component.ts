import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  tokenSubs: Subscription|undefined;
  chatClosedEventSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
    private router: Router,
    private chatService: ChatService) {
  }

  ngOnInit() {
    console.info('chat-option init');
    this.getToken();
    this.chatClosedEventSubs = this.chatService.getChatClosedEvent().subscribe(() => {
      this.isChatOpened = false
    });
  }

  private async getToken() {
    this.tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token)?.subscribe(token => this.token = token);
  }

  openChat() {
    this.isChatOpened = true;
    this.router.navigate(['app/chat']);
  }

  ngOnDestroy() {
    console.info('chat-option destroy');
    if (this.tokenSubs) this.tokenSubs.unsubscribe();
    if (this.chatClosedEventSubs) this.chatClosedEventSubs.unsubscribe();
  }

}

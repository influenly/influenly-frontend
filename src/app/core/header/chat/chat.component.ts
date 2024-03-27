import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', '../header.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() isHandset: boolean = false;
  isChatOpened: boolean = false
  showComponent: string | undefined;

  isShowSubs: Subscription | undefined;
  chatClosedEventSubs: Subscription | undefined;

  constructor(private sessionStorage: SessionStorageService,
    private router: Router,
    private chatService: ChatService) {
  }

  ngOnInit() {
    console.info('chat-option init');
    this.isShowComponent();
    this.chatClosedEventSubs = this.chatService.getChatClosedEvent().subscribe(() => {
      this.isChatOpened = false
    });
  }

  private isShowComponent() {
    this.isShowSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.show_header_actions)?.subscribe(value => this.showComponent = value);
  }

  openChat() {
    this.isChatOpened = true;
    this.router.navigate(['app/chat']);
  }

  ngOnDestroy() {
    console.info('chat-option destroy');
    if (this.isShowSubs) this.isShowSubs.unsubscribe();
    if (this.chatClosedEventSubs) this.chatClosedEventSubs.unsubscribe();
  }

}

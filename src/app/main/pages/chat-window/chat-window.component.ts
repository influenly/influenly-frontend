import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/core/header/chat/services/chat.service';
import { ChatRequestService } from '../profile/services/chat-request.service';
import { CONVERSATION_STATUS, ConversationModel } from '../profile/models/conversation.model';
import { SocketService, TOPIC } from 'src/app/shared/services/socket/socket.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { Subscription, firstValueFrom, map } from 'rxjs';
import { LocationUtilsService } from 'src/app/shared/services/utils/location-utils.service';
import { TalksComponent } from './talks/talks.component';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  @ViewChild(TalksComponent) talksComponent: TalksComponent | undefined = undefined;
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    if (location.pathname === "/app/chat") {
      if (document.getElementById('cdk-overlay-0')) {
        document.getElementById('cdk-overlay-0')!.innerHTML = ''; //close overlays of select, tooltips, etc
      }
      this.goBack();
    }
  }

  conversations: ConversationModel[]|null = null;
  selectedConversation: ConversationModel|undefined;
  conversationsClassified: { pending: ConversationModel[], inProgress: ConversationModel[], finished: ConversationModel[] } = {
    pending: [],
    inProgress: [],
    finished: []
  }
  userId: number|undefined;
  isOnChat: boolean = false;
  isHandset: boolean = false;

  isHandsetSubs: Subscription|undefined;

  constructor(private chatService: ChatService,
              private chatRequestService: ChatRequestService,
              private socketService: SocketService,
              private sessionStorage: SessionStorageService,
              private breakpointObserver: BreakpointObserver,
              private locationUtilsService: LocationUtilsService,
              private dialog: MatDialog,
              private translate: TranslateService) {
    
    this.isHandsetSubs = this.breakpointObserver.observe(['(max-width: 768px)'])
    .pipe(map(result => result.matches)).subscribe(match => {
        this.isHandset = match;
    });

    this.locationUtilsService.changePreviousPage(window, location, '/app/chat');
  }

  ngOnInit() {
    this.checkSocketConnection();
    this.getConversations();
  }

  private async checkSocketConnection() {
    await this.getUserId();
    if (!this.socketService.socketConnected()) {
      await this.socketService.connectSocket();
      this.socketService.subscribeTopic(TOPIC.RECEIVE + this.userId);
    }
  }

  private async getUserId() {
    const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id);
    if (userIdObs) {
      this.userId = await firstValueFrom(userIdObs);
    }
  }

  private getConversations() {
    this.chatRequestService.getConversations$().subscribe({
      next: (v) => {
        this.conversations = v.body;
        this.classifyConversations();
      },
      error: (e) => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            text: this.translate.instant('chat.conversation.popup_getting_conversations_error'),
            textButtonClose: this.translate.instant('general.btn_return')
          }
        });
      }
    });
  }

  classifyConversations() {
    this.conversationsClassified = {
      pending: [],
      inProgress: [],
      finished: []
    };
    if (this.conversations) {
      this.conversations.forEach((conversation) => {
        switch(conversation.status) {
          case CONVERSATION_STATUS.INIT_APPROVAL_PENDING: {
            this.conversationsClassified.pending.push(conversation);
            break;
          }
          case CONVERSATION_STATUS.ACTIVE: {
            this.conversationsClassified.inProgress.push(conversation);
            break;
          }
          case CONVERSATION_STATUS.FINISH_APPROVAL_PENDING: {
            this.conversationsClassified.inProgress.push(conversation);
            break;
          }
          case CONVERSATION_STATUS.FINISHED: {
            this.conversationsClassified.finished.push(conversation);
            break;
          }
        }
      });
    }
  }

  openConversationMessages(conversation: ConversationModel) {
    this.selectedConversation = conversation;
    this.isOnChat = true;
  }

  private goBack() {
    if (this.isOnChat) {
      this.isOnChat = false;
      if (this.talksComponent) {
        this.talksComponent.selectedConversationId = 0;
      }
    } else {
      history.back();
    }
  }

  ngOnDestroy(): void {
    if (this.isHandsetSubs) this.isHandsetSubs.unsubscribe();
      this.chatService.sendChatClosedEvent();
  }
  
}

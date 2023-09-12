import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/header/chat/services/chat.service';
import { ChatRequestService } from '../profile/services/chat-request.service';
import { CONVERSATION_STATUS, ConversationModel } from '../profile/models/conversation.model';
import { SocketService, TOPIC } from 'src/app/shared/services/socket/socket.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  conversations: ConversationModel[]|null = null;
  selectedConversation: ConversationModel|undefined;
  conversationsClassified: { pending: ConversationModel[], inProgress: ConversationModel[], finished: ConversationModel[] } = {
    pending: [],
    inProgress: [],
    finished: []
  }
  userId: number|undefined;

  constructor(private chatService: ChatService,
              private chatRequestService: ChatRequestService,
              private socketService: SocketService,
              private sessionStorage: SessionStorageService) {}

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
        //TODO: Flujo de error
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
  }

  ngOnDestroy(): void {
      this.chatService.sendChatClosedEvent();
  }
  
}

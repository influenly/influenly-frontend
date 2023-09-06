import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ConversationModel } from '../../profile/models/conversation.model';
import { MessageModel } from '../../profile/models/message.model';
import { ChatRequestService } from '../../profile/services/chat-request.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit,  OnChanges {

  @Input() conversation: ConversationModel|undefined;

  userId: number|undefined;
  messages: MessageModel[]|undefined;
  enabledChat: boolean = false;

  constructor(private chatRequestService: ChatRequestService,
              private sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.getUserId();
  }

  ngOnChanges() {
    if (this.conversation && this.conversation.id) {
      this.getMessages(this.conversation.id);
    }
  }
  
  private async getUserId() {
    const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
    if (userIdObs) {
      this.userId = await firstValueFrom(userIdObs);
    }
  }

  private getMessages(conversationId: number) {
    this.chatRequestService.getMessages$(conversationId.toString()).subscribe({
      next: (v) => {
        this.messages = v.body ? v.body : undefined;
        this.messages?.forEach(message => message.isReceived = message.senderUserId != this.userId);
        if (this.messages && this.messages.length > 1) {
          this.enabledChat = true;
        }
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  initConversation(message: MessageModel) {
    const payload = {
      status: 'ACEPTED'
    }
    this.chatRequestService.updateConversation$(payload).subscribe({
      next: (v) => {
        this.enabledChat = true;
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  rejectConversation(message: MessageModel) {

  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/header/chat/services/chat.service';
import { ChatRequestService } from '../profile/services/chat-request.service';
import { CONVERSATION_STATUS, ConversationModel } from '../profile/models/conversation.model';

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

  constructor(private chatService: ChatService,
              private chatRequestService: ChatRequestService) {}

  ngOnInit() {
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

  private classifyConversations() {
    if (this.conversations) {
      this.conversations.forEach((conversation) => {
        switch(conversation.status) {
          case CONVERSATION_STATUS.APPROVAL_PENDING: {
            this.conversationsClassified.pending.push(conversation);
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

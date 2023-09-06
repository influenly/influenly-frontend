import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ConversationModel } from '../../profile/models/conversation.model';
import { MessageModel } from '../../profile/models/message.model';
import { ChatRequestService } from '../../profile/services/chat-request.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { firstValueFrom } from 'rxjs';
import { SocketService } from 'src/app/shared/services/socket/socket.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit,  OnChanges {

  @ViewChild('messagesContainer') private messagesContainer: ElementRef|undefined;
  @ViewChild('textInput') private textInput: ElementRef|undefined;

  @Input() conversation: ConversationModel|undefined;

  userId: number|undefined;
  messages: MessageModel[]|undefined;
  enabledChat: boolean = false;
  inputValue: string = '';
  enterRegex = /\r?\n/;

  constructor(private chatRequestService: ChatRequestService,
              private sessionStorage: SessionStorageService,
              private socketService: SocketService) {}

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
        if (this.messages && this.messages.length > 1 || this.conversation?.status != 'APPROVAL_PENDING') {
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
      id: this.conversation?.id,
      status: 'ACEPTED'
    }
    this.chatRequestService.updateConversation$(payload).subscribe({
      next: (v) => {
        this.enabledChat = true;
        message.type = 'REGULAR';
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  rejectConversation(message: MessageModel) {
    const payload = {
      id: this.conversation?.id,
      status: 'REJECTED'
    }
    this.chatRequestService.updateConversation$(payload).subscribe({
      next: (v) => {
        this.enabledChat = false;
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  sendMessage() {
    if (this.inputValue == '') {
      return;
    }

    const message = {
      conversationId: this.conversation?.id,
      receiverUserId: this.messages ? this.messages[0].senderUserId : undefined,
      content: this.inputValue,
      type: 'REGULAR'
    }
    this.socketService.emitMessage('sendMessage', message);
    this.messages?.push({
      id: 0,
      content: this.inputValue,
      type: 'REGULAR',
      senderUserId: this.messages ? this.messages[0].senderUserId : 0,
      isReceived: false
    });
    this.inputValue = '';
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  onKeyDown(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.inputValue += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onKeyUp(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      if (this.textInput) {
        this.textInput.nativeElement.scrollTop = this.textInput.nativeElement.scrollHeight;
      }
    } else if (event.key === 'Enter') {
      this.scrollToBottom();
    }
  }

}

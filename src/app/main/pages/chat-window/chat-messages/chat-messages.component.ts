import { MESSAGE_TYPE } from './../../profile/models/message.model';
import { CONVERSATION_STATUS } from './../../profile/models/conversation.model';
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

  CONVERSATION_STATUS = CONVERSATION_STATUS;
  userId: number|undefined;
  messages: MessageModel[]|undefined;
  enabledChat: boolean = false;
  inputValue: string = '';
  enterRegex = /\r?\n/;

  constructor(private chatRequestService: ChatRequestService,
              private sessionStorage: SessionStorageService,
              private socketService: SocketService) {
    socketService.outEvent.subscribe(message => {
      console.log(message)
      message.isReceived = message.senderUserId !=  this.userId;
      this.messages?.push(message);
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    });
  }

  ngOnInit() {
    this.getUserId();
  }

  ngOnChanges() {
    if (this.conversation && this.conversation.id) {
      this.getMessages(this.conversation.id);
    }
  }
  
  private async getUserId() {
    const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id);
    if (userIdObs) {
      this.userId = await firstValueFrom(userIdObs);
      this.prepareSocket();
    }
  }

  private async prepareSocket() {
    await this.socketService.connectSocket();
    this.socketService.subscribeTopic('recMessage-' + this.userId);
  }

  private getMessages(conversationId: number) {
    this.chatRequestService.getMessages$(conversationId.toString()).subscribe({
      next: (v) => {
        this.messages = v.body ? v.body : undefined;
        this.messages?.forEach(message => message.isReceived = message.senderUserId !=  this.userId);
        if (this.messages && this.messages.length > 1 || this.conversation?.status != CONVERSATION_STATUS.INIT_APPROVAL_PENDING) {
          this.enabledChat = true;
        }
        this.messages?.sort((m1, m2) => m1.id - m2.id);
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  initConversation(message: MessageModel) {
    const payload = {
      id: this.conversation?.id,
      status: CONVERSATION_STATUS.ACTIVE
    }
    this.chatRequestService.updateConversation$(payload).subscribe({
      next: (v) => {
        this.enabledChat = true;
        message.type = MESSAGE_TYPE.REGULAR;
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  rejectConversation(message: MessageModel) {
    const payload = {
      id: this.conversation?.id,
      status: CONVERSATION_STATUS.FINISHED
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
      receiverUserId: this.userId == this.conversation?.advertiserUserId ? this.conversation?.creatorUserId : this.conversation?.advertiserUserId,
      content: this.inputValue,
      type: MESSAGE_TYPE.REGULAR
    }
    this.socketService.emitMessage('sendMessage', message);
    this.messages?.push({
      ...message,
      id: 0,
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

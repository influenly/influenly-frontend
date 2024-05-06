import { MESSAGE_TYPE } from './../../profile/models/message.model';
import { CONVERSATION_STATUS } from './../../profile/models/conversation.model';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ConversationModel } from '../../profile/models/conversation.model';
import { MessageModel } from '../../profile/models/message.model';
import { ChatRequestService } from '../../profile/services/chat-request.service';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { InitTalkModalComponent } from '../../profile/user-data/init-talk-modal/init-talk-modal.component';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit,  OnChanges {

  @ViewChild('messagesContainer') private messagesContainer: ElementRef|undefined;
  @ViewChild('textInput') private textInput: ElementRef|undefined;

  @Input() conversation: ConversationModel|undefined;
  @Input() userId: number|undefined;
  @Input() isHandset: boolean = false;
  @Output() conversationChange: EventEmitter<null> = new EventEmitter();

  CONVERSATION_STATUS = CONVERSATION_STATUS;
  MESSAGE_TYPE = MESSAGE_TYPE;
  messages: MessageModel[] | undefined;
  enabledChat: boolean = false;
  inputValue: string = '';
  enterRegex = /\r?\n/;

  constructor(private chatRequestService: ChatRequestService,
              private socketService: SocketService,
              private dialog: MatDialog,
              private translate: TranslateService) {
    socketService.outEvent.subscribe(message => {
      console.log(message)
      message.isReceived = message.senderUserId !=  this.userId;
      this.messages?.push(message);
      if (message.type === MESSAGE_TYPE.FINISHER_APPROVAL_PENDING && this.conversation) {
        this.conversation.status = CONVERSATION_STATUS.FINISH_APPROVAL_PENDING;
        this.conversationChange.emit();
      }
      this.checkFinishConversation();
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.conversation && this.conversation.id) {
      this.getMessages(this.conversation.id);
    }
  }
  
  private getMessages(conversationId: number) {
    this.chatRequestService.getMessages$(conversationId.toString()).subscribe({
      next: (v) => {
        this.messages = v.body ? v.body.messages : undefined;
        this.messages?.forEach(message => message.isReceived = message.senderUserId !=  this.userId);
        if ((this.messages && this.messages.length > 1 || this.conversation?.status != CONVERSATION_STATUS.INIT_APPROVAL_PENDING) && this.conversation?.status != CONVERSATION_STATUS.FINISHED) {
          this.enabledChat = true;
        }
        this.messages?.sort((m1, m2) => m1.id - m2.id);
        this.checkFinishConversation();
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
        const messageInitApproved = {
          id: message.id,
          type: MESSAGE_TYPE.REGULAR
        }
        this.socketService.emitMessage('editMessage', messageInitApproved);
        message.type = MESSAGE_TYPE.REGULAR;
        if (this.conversation) {
          this.conversation.status = CONVERSATION_STATUS.ACTIVE;
          this.conversationChange.emit();
        }
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  rejectConversation(message: MessageModel|undefined) {
    if (!message) {
      const dialogRef = this.dialog.open(InformationModalComponent, {
        width: '600px',
        data: {
          text: this.translate.instant('chat.messages.confirm_finish_text'),
          title: this.translate.instant('chat.messages.btn_finish'),
          isTextLeft: true,
          textButtonOk: this.translate.instant('chat.messages.btn_yes_finish'),
          textButtonClose: this.translate.instant('general.btn_cancel')
        }
      });
      const subs = dialogRef.componentInstance.response.subscribe(res => {
        if (res) {
          const payload = {
            id: this.conversation?.id,
            status: CONVERSATION_STATUS.FINISH_APPROVAL_PENDING
          }
          this.chatRequestService.updateConversation$(payload).subscribe({
            next: (v) => {
              this.enabledChat = false;
              if (this.conversation) {
                this.conversation.status = CONVERSATION_STATUS.FINISH_APPROVAL_PENDING;
                this.conversationChange.emit();
              }
              const message = {
                conversationId: this.conversation?.id,
                receiverUserId: this.userId == this.conversation?.advertiserUserId ? this.conversation?.creatorUserId : this.conversation?.advertiserUserId,
                content: 'finisher_message',
                type: MESSAGE_TYPE.FINISHER_APPROVAL_PENDING
              }
              this.socketService.emitMessage('sendMessage', message);
              this.messages?.push({
                ...message,
                id: 0,
                isReceived: false
              });
            },
            error: (e) => {
              //TODO: Flujo de error
            }
          });
        }
        subs.unsubscribe();
        dialogRef.close();
      });
    } else {
      this.confirmFinishConversation(message);
    }
  }

  confirmFinishConversation(message: MessageModel) {
    const payload = {
      id: this.conversation?.id,
      status: CONVERSATION_STATUS.FINISHED
    }
    this.chatRequestService.updateConversation$(payload).subscribe({
      next: (v) => {
        this.enabledChat = false;
        if (message.type === MESSAGE_TYPE.FINISHER_APPROVAL_PENDING) {
          const messageFinisherApproved = {
            id: message.id,
            type: MESSAGE_TYPE.FINISHER_APPROVED
          }
          this.socketService.emitMessage('editMessage', messageFinisherApproved);
          message.type = MESSAGE_TYPE.FINISHER_APPROVED;
        } else {
          const messageInitRejected = {
            id: message.id,
            type: MESSAGE_TYPE.REGULAR
          }
          this.socketService.emitMessage('editMessage', messageInitRejected);
          message.type = MESSAGE_TYPE.REGULAR;
        }
        if (this.conversation) {
          this.conversation.status = CONVERSATION_STATUS.FINISHED;
          this.conversationChange.emit();
        }
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  cancelFinishConversation(message: MessageModel) {
    const payload = {
      id: this.conversation?.id,
      status: CONVERSATION_STATUS.ACTIVE
    }
    this.chatRequestService.updateConversation$(payload).subscribe({
      next: (v) => {
        this.enabledChat = true;
        const messageFinisherRejected = {
          id: message.id,
          type: MESSAGE_TYPE.FINISHER_REJECTED
        }
        this.socketService.emitMessage('editMessage', messageFinisherRejected);
        message.type = MESSAGE_TYPE.FINISHER_REJECTED;
        if (this.conversation) {
          this.conversation.status = CONVERSATION_STATUS.ACTIVE;
          this.conversationChange.emit();
        }
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  private checkFinishConversation() {
    if (this.messages) {
      if (this.conversation?.status != CONVERSATION_STATUS.ACTIVE) {
        this.enabledChat = false;
      } else {
        this.enabledChat = true;
      }
    }
  }

  initNewConversation() {
    this.dialog.open(InitTalkModalComponent, {
      width: '500px',
      data: { id: this.conversation?.creatorUserId }
    });
  }

  sendMessage() {
    if (this.inputValue == '') {
      return;
    }

    const message = {
      conversationId: this.conversation?.id,
      receiverUserId: this.userId == this.conversation?.advertiserUserId ? this.conversation?.creatorUserId : this.conversation?.advertiserUserId,
      content: this.inputValue.trim(),
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

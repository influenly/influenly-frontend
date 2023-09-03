import { Component, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/core/header/chat/services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnDestroy {

  constructor(private chatService: ChatService) {}

  ngOnDestroy(): void {
      this.chatService.sendChatClosedEvent();
  }
  
}

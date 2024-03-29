import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversationModel } from '../../profile/models/conversation.model';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss']
})
export class TalksComponent {

  @Input() conversations: { pending: ConversationModel[], inProgress: ConversationModel[], finished: ConversationModel[] }|undefined;
  @Output() selectedConversation: EventEmitter<ConversationModel> = new EventEmitter();

  selectedConversationId: number = 0;

  selectConversation(conversation: ConversationModel) {
    this.selectedConversationId = conversation.id;
    this.selectedConversation.emit(conversation);
  }

}
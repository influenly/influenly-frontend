import { Component, Input, OnChanges } from '@angular/core';
import { ConversationModel } from '../../profile/models/conversation.model';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss']
})
export class TalksComponent implements OnChanges {

  @Input() conversations: { pending: ConversationModel[], inProgress: ConversationModel[], finished: ConversationModel[] }|undefined;

  ngOnChanges() {
    this.getConversationsData();
  }

  private getConversationsData() {
  }
}
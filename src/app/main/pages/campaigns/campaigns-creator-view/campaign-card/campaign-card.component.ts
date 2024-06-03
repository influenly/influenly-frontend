import { Component, Input } from '@angular/core';
import { CampaignModel } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent {

  @Input() campaign: CampaignModel | undefined;
}

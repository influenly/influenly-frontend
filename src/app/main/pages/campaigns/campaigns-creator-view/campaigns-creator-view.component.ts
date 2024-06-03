import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../models/campaign.model';
import { CampaignService } from '../services/campaign.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-campaigns-creator-view',
  templateUrl: './campaigns-creator-view.component.html',
  styleUrls: ['./campaigns-creator-view.component.scss', '../campaigns.component.scss']
})
export class CampaignsCreatorViewComponent implements OnInit {

  selectorOptions: { key: string, label: string }[] = [];
  selectedOption: { key: string, label: string } | undefined;
  campaigns: CampaignModel[] = [];
  campaignsToShow: CampaignModel[] = [];

  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadTranslations();
    this.loadCampaigns();
  }

  private loadTranslations() {
    this.selectorOptions.push({ key: 'searching', label: this.translate.instant('campaigns.selector.campaigns')});
    this.selectorOptions.push({ key: 'finished', label: this.translate.instant('campaigns.selector.applied')});
  }

  changeSelected($event: { key: string, label: string}) {
    this.selectedOption = $event;
    if (this.selectedOption.key == 'searching') {
      this.campaignsToShow = this.campaigns.filter(campaign => campaign.status == 'ACTIVE');
    } else {
      this.campaignsToShow = this.campaigns.filter(campaign => campaign.status != 'ACTIVE');
    }
  }

  loadCampaigns() {
    this.campaignService.getCampaigns$().subscribe({
      next: async (v) => {
        if (v.body?.ok) {
          this.campaigns = v.body?.campaigns;
          this.campaigns.forEach(campaign => campaign.endDate = this.remainingDays(campaign.endDate));
          this.campaignsToShow = this.campaigns.filter(campaign => campaign.status == 'ACTIVE');
        }
      },
      error: () => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            title: this.translate.instant('campaigns.info.error_title'),
            textButtonClose: this.translate.instant('general.btn_accept')
          }
        });
      }
    });
  }

  remainingDays(endDate: string) {
    let diffDays = Math.floor((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)); 
    if (diffDays < 0) {
      diffDays = 0
    }
    return diffDays + 'd';
  }
}

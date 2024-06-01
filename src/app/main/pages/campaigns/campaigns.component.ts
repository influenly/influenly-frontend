import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewCampaignModalComponent } from './new-campaign-modal/new-campaign-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CampaignsAdvertiserViewComponent } from './campaigns-advertiser-view/campaigns-advertiser-view.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  @ViewChild(CampaignsAdvertiserViewComponent) campaignsAdvertiser: CampaignsAdvertiserViewComponent | undefined = undefined;

  bannerTitle: string = '';
  bannerText: string = '';
  bannerButtonLabel: string = '';
  

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadTranslations();
  }

  private loadTranslations() {
    this.bannerTitle = this.translate.instant('campaigns.banner.title');
    this.bannerText = this.translate.instant('campaigns.banner.text');
    this.bannerButtonLabel = this.translate.instant('campaigns.banner.button');
  }

  createCampaign() {
    const dialogRef = this.dialog.open(NewCampaignModalComponent, {
      width: '500px',
    });
    const subs = dialogRef.componentInstance.result.pipe(
      finalize(() => {
        subs.unsubscribe();
      })
    ).subscribe(result => {
      if (result) {
        this.campaignsAdvertiser?.loadCampaigns();
      }
    });
  }

}

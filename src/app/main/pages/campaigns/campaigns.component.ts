import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewCampaignModalComponent } from './new-campaign-modal/new-campaign-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CampaignsAdvertiserViewComponent } from './campaigns-advertiser-view/campaigns-advertiser-view.component';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';

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
  isCreator: boolean | undefined;
  

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit() {
    this.init();
  }

  private async init() {
    const userType = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.user_type);
    this.isCreator = userType === USER_TYPE.CREATOR;
    this.bannerTitle = this.translate.instant('campaigns.banner.title');
    this.bannerText = this.translate.instant('campaigns.banner.text');
    if (!this.isCreator) {
      this.bannerButtonLabel = this.translate.instant('campaigns.banner.button');
    }
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

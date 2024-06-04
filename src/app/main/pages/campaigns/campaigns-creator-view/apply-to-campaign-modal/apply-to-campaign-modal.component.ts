import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CampaignModel } from '../../models/campaign.model';
import { TranslateService } from '@ngx-translate/core';
import { CampaignService } from '../../services/campaign.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';

@Component({
  selector: 'app-apply-to-campaign-modal',
  templateUrl: './apply-to-campaign-modal.component.html',
  styleUrls: ['./apply-to-campaign-modal.component.scss']
})
export class ApplyToCampaignModalComponent implements OnInit {

  endDate: string = '';
  constructor(
    private dialogRef: MatDialogRef<ApplyToCampaignModalComponent>,
    private translate: TranslateService,
    private campaignService: CampaignService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      campaign: CampaignModel
    }
  ) { }

  ngOnInit() {
    const endDate = this.data.campaign.endDate;
    this.endDate = endDate.substring(0, endDate.length - 1) + this.translate.instant('campaigns.remaining_days');
  }

  apply() {
    const payload = {
      id: this.data.campaign.id
    }
    this.campaignService.applyToCampaign$(payload).subscribe({
      next: async (v) => {
        console.log(v)
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'check',
            title: this.translate.instant('campaigns.modal.apply.success_title'),
            text: this.translate.instant('campaigns.modal.apply.success_text'),
            textButtonClose: this.translate.instant('general.btn_accept')
          }
        });
      },
      error: () => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            title: this.translate.instant('campaigns.modal.apply.error_title'),
            text: this.translate.instant('campaigns.modal.apply.error_text'),
            textButtonClose: this.translate.instant('general.btn_accept')
          }
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}

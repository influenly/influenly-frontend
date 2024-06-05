import { Component, Inject, Input, OnInit } from '@angular/core';
import { CampaignModel } from '../../models/campaign.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CampaignService } from '../../services/campaign.service';
import { UserModel } from '../../../profile/models/user-data.model';

@Component({
  selector: 'app-campaign-detail-modal',
  templateUrl: './campaign-detail-modal.component.html',
  styleUrls: ['./campaign-detail-modal.component.scss']
})
export class CampaignDetailModalComponent implements OnInit {

  applicants: UserModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      campaign: CampaignModel
    },
    private dialogRef: MatDialogRef<CampaignDetailModalComponent>,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.campaignService.getApplicants$(this.data.campaign.id).subscribe({
      next: (v) => {
        this.applicants = v.body.campaign.creators;
      },
      error: () => {

      }
    });
  }

  openUserProfile(creator: UserModel) {

  }

  close() {
    this.dialogRef.close();
  }

}

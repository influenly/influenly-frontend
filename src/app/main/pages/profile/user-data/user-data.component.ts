import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserDataModel } from '../models/user-data.model';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { InitTalkModalComponent } from './init-talk-modal/init-talk-modal.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit, OnChanges {

  @Input() userData: UserDataModel|null = null;
  @Input() isOwnView: boolean|undefined;

  socialNetworks: any[] = [];
  isCreatorUser: boolean = true;

  constructor(private dialog: MatDialog,
              private profileService: ProfileService) {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.isCreatorUser = this.userData?.type === USER_TYPE.CREATOR;
    this.socialNetworks = this.profileService.loadSocialNetworks(this.userData?.socialNetworks);
  }

  openSocialMediaLink(link: string) {
    window.open(link.includes('https://') ? link : 'https://' + link, '_blank');
  }

  public editProfile() {
    this.dialog.open(EditProfileModalComponent, {
      width: '600px',
      data: this.userData
    });
  }

  public initTalk() {
    this.dialog.open(InitTalkModalComponent, {
      width: '500px',
      data: this.userData
    });
  }

}

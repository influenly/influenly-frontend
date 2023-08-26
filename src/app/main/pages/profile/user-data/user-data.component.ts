import { Component, Input, OnInit } from '@angular/core';
import { UserDataModel } from '../models/user-data.model';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input() userData: UserDataModel|undefined;
  @Input() isOwnView: boolean|undefined;

  socialNetworks: any[] = [];
  isCreatorUser: boolean = true;

  constructor(private dialog: MatDialog,
              private profileService: ProfileService) {}

  ngOnInit() {
    this.socialNetworks = this.profileService.loadSocialNetworks(this.userData?.socialNetworks);
    this.isCreatorUser = this.userData?.type === USER_TYPE.CREATOR;
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

}

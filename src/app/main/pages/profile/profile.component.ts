import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { ProfileService } from './services/profile.service';
import { UserModel } from './models/user-data.model';
import { ProfileRequestService } from './services/profile-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userData: UserModel | undefined;
  isOwnView: boolean = false;
  isCreatorUser: boolean = false;
  loadingData: boolean = true;

  profileDataSubs: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorage: SessionStorageService,
    private profileService: ProfileService,
    private profileRequestService: ProfileRequestService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit() {
    this.getComponentView();
  }

  private async getComponentView() {
    let href = this.router.url;
    this.isOwnView = href.includes('profile');
    if (this.isOwnView) {
      const userId = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.user_id);
      this.profileService.getCachedProfileData(userId).subscribe(async (userResponse) => {
        this.loadUserData(userResponse?.data.user);
      });
    } else {
      const userId = href.substring(href.lastIndexOf('/') + 1);
      this.route.queryParams.forEach(async (params) => {
        const userId = await this.encryptionService.decrypt(params['trackingId']);
        this.profileRequestService.getProfileData$(userId).subscribe(async (userResponse) => {
          this.loadUserData(userResponse.body?.data.user);
        });
      });
    }

    if (!this.loadingData) {
      this.profileDataSubs = this.profileService.getProfileData().subscribe(newUserData => {
        this.loadUserData(newUserData?.data.user);
      });
    }
  }

  private async loadUserData(data: UserModel | undefined) {
    this.userData = data;
    if (typeof this.userData?.type == 'undefined') {
      if (this.isOwnView) {
        const userTypeObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
        if (userTypeObs) {
          let userTypeString = await firstValueFrom(userTypeObs);
          let userType = USER_TYPE[userTypeString as keyof typeof USER_TYPE];
          if (this.userData && this.userData) this.userData.type = userType;
        }
      }
    }
    if (this.userData) {
      this.isCreatorUser = this.userData.type == USER_TYPE.CREATOR;
    }
    this.loadingData = false;
  }

  ngOnDestroy() {
    if (this.profileDataSubs) this.profileDataSubs.unsubscribe();
  }
    
}

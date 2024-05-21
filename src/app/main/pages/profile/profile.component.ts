import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { ProfileService } from './services/profile.service';
import { UserModel } from './models/user-data.model';
import { ProfileRequestService } from './services/profile-request.service';
import { MatDialog } from '@angular/material/dialog';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { TranslateService } from '@ngx-translate/core';

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
    private sessionStorage: SessionStorageService,
    private profileService: ProfileService,
    private profileRequestService: ProfileRequestService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getComponentView();
  }

  private async getComponentView() {
    let href = this.router.url;
    this.isOwnView = href.includes('profile');
    if (this.isOwnView) {
      const username = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.username);
      this.profileService.getCachedProfileData(username).subscribe({
        next: async (userResponse) => {
          await this.loadUserData(userResponse?.data.user);
          this.profileDataSubs = this.profileService.getProfileData().subscribe(newUserData => {
            this.loadUserData(newUserData?.data.user);
          });
        },
        error: () => {
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'warning',
              title: this.translate.instant('profile.get_profile_error'),
              textButtonClose: this.translate.instant('general.btn_accept')
            }
          });
          this.loadingData = false;
        }
      });
    } else {
      // this.route.queryParams.forEach(async (params) => {
      //   const userId = await this.encryptionService.decrypt(params['trackingId']);
      //   this.profileRequestService.getProfileData$(userId).subscribe(async (userResponse) => {
      //     this.loadUserData(userResponse.body?.data.user);
      //   });
      // });
      const username = href.substring(href.lastIndexOf('/') + 1);
      this.profileRequestService.getProfileDataByUsername$(username).subscribe({
        next: (v) => {
          this.loadUserData(v.body?.data.user);
        },
        error: (e) => {
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'warning',
              text: this.translate.instant('profile.get_profile_error'),
              textButtonClose: this.translate.instant('general.btn_return')
            }
          });
          this.router.navigate(['/app/profile']);
        }
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

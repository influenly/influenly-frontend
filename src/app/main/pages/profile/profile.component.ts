import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { ProfileService } from './services/profile.service';
import { UserDataModel } from './models/user-data.model';
import { ProfileRequestService } from './services/profile-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userDataMock: UserDataModel = {
    ok: true,
    user: {
      id: 1,
      username: "Pampa",
      email: "pampa@bird.com",
      country: "AR",
      contentTags: ["sports", "business","others","creative"],
      description: "Descripción del perfil para ser usado en content y asi generar interacciones con distintas empresas a traves de la actividad en la plataforma. De manera tal de conseguir mejor remuneración.",
      profileImg: undefined,
      type: USER_TYPE.CREATOR,
      role: 'REGULAR',
      onboardingCompleted: true,
      networks: [
        {
          platform: 'YOUTUBE',
          name: 'Peje Riders',
          profileImg: 'https://yt3.googleusercontent.com/bL7P_zt4RcNdENRED979Ekqg4OXVC-7-o2LBZ25kKAXD8hz35pSc0UKnFmWuTgtuZdPW2Rqp=s176-c-k-c0x00ffffff-no-rj',
          url: 'youtube.com/@pejeriders',
          basicAnalytics: {
            totalSubs: 67991,
            totalVideos: 202,
          },
          integrated: true,
        },
        {
          platform: 'YOUTUBE',
          name: 'pampatech',
          profileImg: 'https://assets.mofoprod.net/network/images/cover-picture_i4S5vbB.original.jpg',
          url: 'https://www.youtube.com/@Leandro',
          integrated: false,
        },
        {
          platform: 'INSTAGRAM',
          name: 'pejeriders',
          url: 'https://www.instagram.com/pampaibaceta',
          integrated: false
        },
        {
          platform: 'INSTAGRAM',
          name: 'electro_mov_original',
          url: 'https://www.instagram.com/electro_mov',
          integrated: false,
        },
        {
          platform: 'INSTAGRAM',
          name: 'pampatech',
          url: 'https://www.instagram.com/pampatech',
          integrated: true,
          basicAnalytics: {
            totalSubs: 20032,
            totalVideos: 104
          }
        },
        {
          platform: 'TIKTOK',
          name: 'Pampa tiktok',
          url: 'https://www.tiktok.com/pampa',
          integrated: false,
        }
      ]
    }
  }

  // userData = {
  //   username: "Levi's",
  //   profileImg: undefined,
  //   country: "CA",
  //   socialNetworks: ["www.instagram.com/levis", "www.youtube.com/@levis"],
  //   contentTags: ["business","others"],
  //   description: "Lo sabemos. La acción más sustentable es no comprar, pero cuando te hace falta algo acá o allá y compres, queremos que tomes la mejor decisión posible. Buscá estilos atemporales y que se hayan fabricado de manera responsable con materiales amigables con el planeta. Una de las alternativas sustentables en tejidos que debés tomar en cuenta es el TENCEL™, proveniente de fibra de madera y que sustituye a la viscosa tradicional.",
  //   type: USER_TYPE.ADVERTISER
  // }

  userData: UserDataModel | null = null;
  isOwnView: boolean = false;
  isCreatorUser: boolean = false;

  profileDataSubs: Subscription | undefined;

  constructor(private router: Router,
              private sessionStorage: SessionStorageService,
              private profileService: ProfileService,
              private profileRequestService: ProfileRequestService) {}

  ngOnInit() {
    this.getComponentView();
  }

  private async getComponentView() {
    let href = this.router.url;
    this.isOwnView = href.includes('profile');
    if (this.isOwnView) {
      const userId = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.user_id);
      this.profileService.getCachedProfileData(userId).subscribe(async (userProfile) => {
        this.loadUserData(userProfile);
      });
    } else {
      const userId = href.substring(href.lastIndexOf('/') + 1);
      this.profileRequestService.getProfileData$(userId).subscribe(async (userProfile) => {
        this.loadUserData(userProfile.body);
      });
    }

    this.profileDataSubs = this.profileService.getProfileData().subscribe(data => {
      this.loadUserData(data);
    });
  }

  private async loadUserData(data: UserDataModel | null) {
    this.userData = data;
    if (typeof this.userData?.user?.type == 'undefined') {
      if (this.isOwnView) {
        const userTypeObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
        if (userTypeObs) {
          let userTypeString = await firstValueFrom(userTypeObs);
          let userType = USER_TYPE[userTypeString as keyof typeof USER_TYPE];
          if (this.userData && this.userData.user) this.userData.user.type = userType;
        }
      }
    }
    if (this.userData && this.userData.user) {
      this.isCreatorUser = this.userData.user.type == USER_TYPE.CREATOR;
    }
  }

  ngOnDestroy() {
    if (this.profileDataSubs) this.profileDataSubs.unsubscribe();
  }
    
}

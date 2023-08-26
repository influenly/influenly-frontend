import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // userData = {
  //   username: "Pampa",
  //   profileImg: undefined,
  //   country: "AR",
  //   socialNetworks: ["www.instagram.com/pampaibaceta", "www.youtube.com/channel/soytribu"],
  //   contentTags: ["sports", "business"],
  //   description: "Descripción del perfil para ser usado en content y asi generar interacciones con distintas empresas a traves de la actividad en la plataforma. De manera tal de conseguir mejor remuneración.",
  //   integratedNetworks: [
  //     {
  //       network: 'YOUTUBE',
  //       channels: [
  //         {
  //           name: 'pejeriders',
  //           totalSubs: 67991,
  //           totalVideos: 202,
  //           totalViews: 14995042
  //         },
  //         {
  //           name: 'pampatech',
  //           totalSubs: 2003,
  //           totalVideos: 29,
  //           totalViews: 100231
  //         }
  //       ]
  //     },
  //     {
  //       network: 'INSTAGRAM',
  //       channels: [
  //         {
  //           name: 'pejeriders',
  //           totalSubs: 347991,
  //           totalVideos: 577,
  //           totalViews: 1499504234
  //         },
  //         {
  //           name: 'electro_mov_original',
  //           totalSubs: 34791,
  //           totalVideos: 517,
  //           totalViews: 19504234
  //         },
  //         {
  //           name: 'pampatech',
  //           totalSubs: 20032,
  //           totalVideos: 104,
  //           totalViews: 10023122
  //         }
  //       ]
  //     }
  //   ],
  //   type: USER_TYPE.CREATOR
  // }

  userData = {
    username: "Levi's",
    profileImg: undefined,
    country: "CA",
    socialNetworks: ["www.instagram.com/levis", "www.youtube.com/@levis"],
    contentTags: ["business","others"],
    description: "Lo sabemos. La acción más sustentable es no comprar, pero cuando te hace falta algo acá o allá y compres, queremos que tomes la mejor decisión posible. Buscá estilos atemporales y que se hayan fabricado de manera responsable con materiales amigables con el planeta. Una de las alternativas sustentables en tejidos que debés tomar en cuenta es el TENCEL™, proveniente de fibra de madera y que sustituye a la viscosa tradicional.",
    type: USER_TYPE.ADVERTISER
  }

  isOwnView: boolean = false;
  isCreatorUser: boolean = false;

  constructor(private router: Router,
              private sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.getComponentView();
  }

  private async getComponentView() {
    // const userTypeObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
    // if (userTypeObs) {
    //   let userTypeString = await firstValueFrom(userTypeObs);
    //   let userType = USER_TYPE[userTypeString as keyof typeof USER_TYPE];
    //   if (userType === USER_TYPE.CREATOR) this.isCreatorUser = true;
    // }

    // let userType = USER_TYPE[this.userData.type as keyof typeof USER_TYPE];
    // if (userType === USER_TYPE.CREATOR) this.isCreatorUser = true;

    this.isCreatorUser = this.userData.type === USER_TYPE.CREATOR;

    let href = this.router.url;
    this.isOwnView = href.includes('profile');
  }
    
}

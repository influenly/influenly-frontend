import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userData = {
    username: "Pampa",
    profileImg: undefined,
    country: "AR",
    socialNetworks: ["www.instagram.com/pampaibaceta", "www.youtube.com/channel/soytribu"],
    contentTags: ["sports", "business"],
    description: "Descripción del perfil para ser usado en content y asi generar interacciones con distintas empresas a traves de la actividad en la plataforma. De manera tal de conseguir mejor remuneración.",
    integratedNetworks: [
      {
        network: 'YOUTUBE',
        channels: [
          {
            name: 'pejeriders',
            totalSubs: 67991,
            totalVideos: 202,
            totalViews: 14995042
          },
          {
            name: 'pampatech',
            totalSubs: 2003,
            totalVideos: 29,
            totalViews: 100231
          }
        ]
      }
    ]
  }
    
}

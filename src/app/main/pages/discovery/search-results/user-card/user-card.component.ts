import { Component, Input, OnInit } from '@angular/core';
import { NetworkProfileModel, UserModel } from '../../../profile/models/user-data.model';
import { ProfileService } from '../../../profile/services/profile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() userData: UserModel|undefined;

  network: NetworkProfileModel|undefined;
  picture: string|undefined;
  followers: string = '';
  networkIcons: string[] = [];
  tags: string[] = [];

  constructor(private profileService: ProfileService,
              private translate: TranslateService) {

  }

  ngOnInit() {
    this.network = this.userData?.networks[0];
    this.picture = this.userData?.networks[0].profileImg;
    const followers = this.userData?.networks[0].basicAnalytics?.totalSubs ? this.userData?.networks[0].basicAnalytics?.totalSubs : 0;
    this.followers = this.profileService.transformFollowersNumber(followers);
    this.getNetworkIcons(this.userData?.networks);
    this.refactorTags(this.userData?.contentTags);
  }

  private getNetworkIcons(networks: NetworkProfileModel[] | undefined) {
    let networkIcons: string[] = [];
    if (networks) {
      for (const network of networks) {
        const platform = network.platform.toLowerCase();
        if (network.integrated && !networkIcons.includes(platform)) {
          networkIcons.push(platform);
        }
      }
    }
    this.networkIcons = networkIcons;
  }

  private refactorTags(contentTags: string[] | undefined) {
    let tags: string[] = [];
    let charCount = 0;
    if (contentTags) {
      for (const content of contentTags) {
        const translation = this.translate.instant('onboarding.content.tag_list.' + content);
        charCount += translation.length;
        if (charCount > 18) {
          const extraTags = contentTags.length - tags.length;
          tags.push('+' + extraTags);
          break;
        } else {
          tags.push(translation);
        }
      }
    }
    this.tags = tags;
  }
  
}

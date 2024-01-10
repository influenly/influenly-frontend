import { Component, Input, OnInit } from '@angular/core';
import { NetworkProfileModel, UserModel } from '../../../profile/models/user-data.model';
import { ProfileService } from '../../../profile/services/profile.service';

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

  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
    this.network = this.userData?.networks[0];
    this.picture = this.userData?.networks[0].profileImg;
    const followers = this.userData?.networks[0].basicAnalytics?.totalSubs ? this.userData?.networks[0].basicAnalytics?.totalSubs : 0;
    this.followers = this.profileService.transformFollowersNumber(followers);
  }
}

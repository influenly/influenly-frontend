import { Component, Input, OnInit } from '@angular/core';
import { NetworkProfileModel, UserDataModel } from '../models/user-data.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit {

  @Input() userData: UserDataModel|null = null;

  networksTransformed: { platform: string, networks: NetworkProfileModel[] }[] = [];
  selectedNetwork: { platform: string, networks: NetworkProfileModel[] }|undefined;
  data: any[] = [];

  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
    this.setTransformedData();
  }

  private setTransformedData() {
    this.data = [];
    this.groupNetworks();
    this.selectedNetwork = this.selectedNetwork ? this.selectedNetwork : this.networksTransformed[0];
    if (this.selectedNetwork) {
      for (let network of this.selectedNetwork.networks) {
        let totalSubs = '';
        let totalVideos = '';
        if (network.basicAnalytics) {
          totalSubs = this.profileService.transformFollowersNumber(network.basicAnalytics.totalSubs);
          totalVideos = this.profileService.transformFollowersNumber(network.basicAnalytics.totalVideos);
        }
        const dataRow = {
          totalSubs: totalSubs,
          totalVideos: totalVideos
        }
        this.data.push(dataRow);
      }
    }
  }

  private groupNetworks() {
    this.networksTransformed = [];
    this.userData?.user?.networks?.forEach(network => {
      let platformNetworks = this.networksTransformed.filter (n => n.platform === network.platform);
      if (platformNetworks && platformNetworks.length > 0) {
        platformNetworks[0].networks.push(network);
      } else {
        this.networksTransformed.push({ platform: network.platform, networks: [network] });
      }
    });
  }

  changeSelectedNetwork($event: { platform: string, networks: NetworkProfileModel[] }) {
    this.selectedNetwork = $event;
    this.setTransformedData();
  }

  openNetworkPage(network: NetworkProfileModel) {
    window.open(network.url?.includes('https://') ? network.url : 'https://' + network.url, '_blank');
  }

}

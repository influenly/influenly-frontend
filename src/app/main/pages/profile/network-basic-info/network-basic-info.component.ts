import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NetworkProfileModel, UserModel } from '../models/user-data.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit, OnChanges {

  @Input() userData: UserModel|undefined;

  networksTransformed: { platform: string, networks: NetworkProfileModel[] }[] = [];
  selectedNetwork: { platform: string, networks: NetworkProfileModel[] } | undefined;
  data: any[] = [];

  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {
    this.setTransformedData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'].previousValue.networks != changes['userData'].currentValue.networks) {
      this.selectedNetwork = undefined;
      this.setTransformedData();
    }
  }

  private setTransformedData() {
    this.data = [];
    this.groupNetworks();
    this.selectedNetwork = this.selectedNetwork ? this.selectedNetwork : this.networksTransformed[0];
    if (this.selectedNetwork) {
      for (let network of this.selectedNetwork.networks) {
        let totalSubs = '';
        let totalVideos = '';
        if (network.integration) {
          totalSubs = this.profileService.transformFollowersNumber(network.integration.analyticsYoutube.totalSubs);
          totalVideos = this.profileService.transformFollowersNumber(network.integration.analyticsYoutube.totalVideos);
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
    this.userData?.networks?.forEach(network => {
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

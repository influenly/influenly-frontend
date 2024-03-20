import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NetworkProfileModel, UserModel } from '../models/user-data.model';
import { ProfileService } from '../services/profile.service';
import { Platform } from 'src/app/shared/constants/platforms.enum';
import { NetworkSelectorComponent } from '../network-selector/network-selector.component';

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit, OnChanges {

  @Input() userData: UserModel|undefined;
  @ViewChild(NetworkSelectorComponent) networkSelector: NetworkSelectorComponent | undefined = undefined;

  networksTransformed: { platform: string, networks: NetworkProfileModel[] }[] = [];
  selectedNetwork: { platform: string, networks: NetworkProfileModel[] } | undefined;
  data: any[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.setTransformedData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'].previousValue?.networks != changes['userData'].currentValue.networks) {
      this.setTransformedData(true);
    }
  }

  private setTransformedData(onChanges?: boolean) {
    this.data = [];
    this.groupNetworks();
    if (onChanges) {
      const selected = this.networksTransformed.filter(net => net.platform === this.selectedNetwork?.platform);
      this.selectedNetwork = selected && selected.length > 0 ? selected[0] : this.networksTransformed[0];
      if (this.networkSelector) this.networkSelector.selectedPlatform = this.selectedNetwork.platform;
    } else {
      this.selectedNetwork = this.selectedNetwork ? this.selectedNetwork : this.networksTransformed[0];
    }
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
    this.networksTransformed = [{platform: Platform.Youtube, networks: []}];
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

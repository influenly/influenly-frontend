import { Component, Input, OnInit } from '@angular/core';
import { ChannelAnalyticModel, IntegratedNetworkModel, UserDataModel } from '../models/user-data.model';

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit {

  @Input() userData: UserDataModel|undefined;

  selectedNetwork: IntegratedNetworkModel|undefined;
  selectedChannel: ChannelAnalyticModel|undefined;
  data : any = {};

  ngOnInit() {
    this.selectedNetwork = this.userData?.integratedNetworks ? this.userData.integratedNetworks[0] : undefined;
    this.selectedChannel = this.selectedNetwork?.channels[0];
    this.setTransformedData();
  }

  private setTransformedData() {
    if (this.selectedChannel) {
      this.data.subs = this.transformNumbers(this.selectedChannel.totalSubs);
      this.data.videos = this.transformNumbers(this.selectedChannel.totalVideos);
      this.data.visits = this.transformNumbers(this.selectedChannel.totalViews);
    }
  }

  private transformNumbers(number: number): string {
    if (number > 1000000) {
      return `${Math.round((number / 1000000))}M`;
    } else if (number > 1000) {
      return `${Math.round((number / 1000))}K`;
    }
    return number + '';
  }

  selectChannel(channel: ChannelAnalyticModel) {
    this.selectedChannel = channel;
    this.setTransformedData();
  }

  changeSelectedNetwork($event: IntegratedNetworkModel) {
    this.selectedNetwork = $event;
    this.selectedChannel = this.selectedNetwork?.channels[0];
    this.setTransformedData();
  }
}

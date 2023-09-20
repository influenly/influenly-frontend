import { Component, Input, OnInit } from '@angular/core';
import { ChannelAnalyticModel, IntegratedNetworkModel, UserDataModel } from '../models/user-data.model';

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit {

  @Input() userData: UserDataModel|null = null;

  selectedNetwork: IntegratedNetworkModel|undefined;
  data: any[] = [];

  ngOnInit() {
    this.selectedNetwork = this.userData?.integratedNetworks ? this.userData.integratedNetworks[0] : undefined;
    this.setTransformedData();
  }

  private setTransformedData() {
    this.data = [];
    if (this.selectedNetwork) {
      for (let channel of this.selectedNetwork?.channels) {
        const dataRow = {
          totalSubs: this.transformNumbers(channel.totalSubs),
          totalVideos: this.transformNumbers(channel.totalVideos),
          totalViews: this.transformNumbers(channel.totalViews)
        }
        this.data.push(dataRow);
      }
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

  changeSelectedNetwork($event: IntegratedNetworkModel) {
    this.selectedNetwork = $event;
    this.setTransformedData();
  }

  openNetworkPage(channel: ChannelAnalyticModel) {
    window.open(channel.link?.includes('https://') ? channel.link : 'https://' + channel.link, '_blank');
  }

}

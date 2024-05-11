import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NetworkProfileModel, UserModel } from '../models/user-data.model';
import { ProfileService } from '../services/profile.service';
import { Platform } from 'src/app/shared/constants/platforms.enum';
import { NetworkSelectorComponent } from '../network-selector/network-selector.component';
import { IntegrationModel } from '../../onboarding/models/integration.model';
import { OnboardingService } from '../../onboarding/services/onboarding.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

declare var initTokenClient: Function;
declare var getToken: Function;

@Component({
  selector: 'app-network-basic-info',
  templateUrl: './network-basic-info.component.html',
  styleUrls: ['./network-basic-info.component.scss']
})
export class NetworkBasicInfoComponent implements OnInit, OnChanges {

  @Input() userData: UserModel|undefined;
  @Input() isOwnView: boolean = false;
  @ViewChild(NetworkSelectorComponent) networkSelector: NetworkSelectorComponent | undefined = undefined;

  Platform = Platform;
  networksTransformed: { platform: string, networks: NetworkProfileModel[] }[] = [];
  selectedNetwork: { platform: string, networks: NetworkProfileModel[] } | undefined;
  data: any[] = [];

  constructor(
    private profileService: ProfileService,
    private onboardingService: OnboardingService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

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

  async integrateNetwork() {
    await initTokenClient(async (response: any) => {
      const payload: IntegrationModel = {
        authorizationCode : response.code,
        platform: Platform.Youtube
      }
      this.onboardingService.integration$(payload).subscribe({
        next: (v) => {
          if (this.userData) this.profileService.reloadProfileData(this.userData.id.toString());
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'check',
              title: this.translate.instant('profile.networks.integration.ok'),
              textButtonClose: this.translate.instant('general.btn_return')
            }
          });
        },
        error: (e) => {
          if (e.error?.error === 'Network already integrated') {
            this.dialog.open(InformationModalComponent, {
              width: '600px',
              data: {
                icon: 'warning',
                title: this.translate.instant('profile.networks.integration.already_integrated'),
                textButtonClose: this.translate.instant('general.btn_return')
              }
            });
          } else {
            this.dialog.open(InformationModalComponent, {
              width: '600px',
              data: {
                icon: 'warning',
                title: this.translate.instant('profile.networks.integration.error'),
                textButtonClose: this.translate.instant('general.btn_return')
              }
            });
          }
        }
      });
    });
    getToken();
  }

}

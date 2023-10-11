import { Injectable } from "@angular/core";
import { NetworkProfileModel, UserDataModel } from "../models/user-data.model";
import { BehaviorSubject, Observable, map, of, shareReplay, take } from "rxjs";
import { ProfileRequestService } from "./profile-request.service";
import { NetworkObjectModel } from "../../onboarding/models/onboarding.model";

@Injectable()
export class ProfileService {

  constructor(private profileRequestService: ProfileRequestService) {}

  private userProfileData: BehaviorSubject<UserDataModel|null> = new BehaviorSubject<UserDataModel|null>(null);

  getProfileData(): Observable<UserDataModel | null> {
    return this.userProfileData.asObservable();
  }

  public setProfileData(profileData: UserDataModel|null) {
    this.userProfileData.next(profileData);
  }

  public getCachedProfileData(userId: string): Observable<UserDataModel|null> {
    if (!this.userProfileData.getValue()) {

      let userProfileDataObs = this.profileRequestService.getProfileData$(userId).pipe(
        map(res => res.body ? { ...res.body.user, networks: res.body.networks} : null ),
        shareReplay(1)
      );
      userProfileDataObs.pipe(take(1)).subscribe(res => this.userProfileData.next(res));

      return userProfileDataObs;
    } else {
      return of(this.userProfileData.getValue());
    }
  }

  public loadSocialNetworks(networks: NetworkProfileModel[] | undefined) {
      let transformedSocialNetworks = [];
      if (networks) {
        for (const network of networks) {
          const networkElement = {
            link: network.url,
            icon: network.platform.toLowerCase(),//this.getPlatformOnLink(network),
            name: network.url.substring(network.url.lastIndexOf('/') + 1),
            integrated: network.integrated
          };
          transformedSocialNetworks.push(networkElement);
        }
      }
      return transformedSocialNetworks;
  }

  private getPlatformOnLink(network: string): string {
      if (network.includes('youtube')) {
        return 'youtube';
      }
      if (network.includes('instagram')) {
        return 'instagram';
      }
      if (network.includes('tiktok')) {
        return 'tiktok';
      }
      if (network.includes('twitter')) {
        return 'twitter';
      }
      if (network.includes('twitch')) {
        return 'twitch';
      }
      return 'website';
  }

  public generateNetworksObject(networks: any): NetworkObjectModel {
    let networksObject: any = {};

    networks.forEach((network: any) => {
      if (networksObject[network.icon]) {
        networksObject[network.icon].push(network.url);
      } else {
        networksObject[network.icon] = [network.url];
      }
    });

    return networksObject;
  }
    
}
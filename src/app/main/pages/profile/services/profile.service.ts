import { Injectable } from "@angular/core";
import { UserDataModel } from "../models/user-data.model";
import { BehaviorSubject, Observable, map, of, shareReplay, take } from "rxjs";
import { ProfileRequestService } from "./profile-request.service";

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
        map(res => res.body),
        shareReplay(1)
      );
      userProfileDataObs.pipe(take(1)).subscribe(res => this.userProfileData.next(res));

      return userProfileDataObs;
    } else {
      return of(this.userProfileData.getValue());
    }
  }

  public loadSocialNetworks(socialNetworks: string[] | undefined) {
      let transformedSocialNetworks = [];
      if (socialNetworks) {
        for (const network of socialNetworks) {
          const networkElement = {
            link: network,
            icon: this.getPlatformOnLink(network),
            name: network.substring(network.lastIndexOf('/') + 1)
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
      return 'web';
  }
    
}
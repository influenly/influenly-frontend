import { Injectable, OnDestroy } from "@angular/core";
import { NetworkProfileModel, UserDataModel } from "../models/user-data.model";
import { BehaviorSubject, Observable, Subscription, map, of, shareReplay, take } from "rxjs";
import { ProfileRequestService } from "./profile-request.service";
import { SESSION_STORAGE_KEYS, SessionStorageService } from "src/app/shared/services/storages/session-storage.service";

@Injectable()
export class ProfileService implements OnDestroy {

  showHeaderActionsSubs: Subscription | undefined;

  constructor(
    private profileRequestService: ProfileRequestService,
    private sessionStorage: SessionStorageService
  ) {
    this.showHeaderActionsSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.show_header_actions)?.subscribe((value) => {
      if (!value) {
        this.clearProfileData();
      }
    });
  }

  ngOnDestroy() {
    if (this.showHeaderActionsSubs)this.showHeaderActionsSubs.unsubscribe();
  }

  private userProfileData: BehaviorSubject<UserDataModel|null> = new BehaviorSubject<UserDataModel|null>(null);

  getProfileData(): Observable<UserDataModel | null> {
    return this.userProfileData.asObservable();
  }

  public setProfileData(profileData: UserDataModel|null) {
    this.userProfileData.next(profileData);
  }

  clearProfileData() {
    this.userProfileData.next(null);
    this.userProfileData.complete();
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

  public loadSocialNetworks(networks: NetworkProfileModel[] | undefined) {
      let transformedSocialNetworks = [];
      if (networks) {
        for (const network of networks) {
          const networkElement = {
            link: network.url,
            icon: network.platform.toLowerCase(),//this.getPlatformOnLink(network),
            name: network.name ? network.name : network.url.substring(network.url.lastIndexOf('/') + 1),
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

  public transformFollowersNumber(number: number): string {
    if (number > 1000000) {
      return `${Math.round((number / 1000000) * 10) / 10}M`;
    } else if (number > 1000) {
      return `${Math.round((number / 1000) * 10) / 10}K`;
    }
    return number + '';
  }
    
}
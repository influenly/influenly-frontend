import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { SessionStorageService, SESSION_STORAGE_KEYS } from 'src/app/shared/services/storages/session-storage.service';
import { StepsVisualizerComponent } from './steps-visualizer/steps-visualizer.component';
import { OnboardingService } from './services/onboarding.service';
import { OnboardingModel } from './models/onboarding.model';
import { Router } from '@angular/router';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { ProfileService } from '../profile/services/profile.service';
import { LocationUtilsService } from 'src/app/shared/services/utils/location-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';


export enum SLIDE {
  PERSONAL_INFO, NETWORKS, CONTENT, YOUTUBE_INTEGRATION
};
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  animations: [
    trigger('personalInfoSlide', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('* => *', animate(300)),
      transition('void => *', animate(0))
    ]),
    trigger('contentSlide', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('* => *', animate(300))
    ]),
    trigger('youtubeSlide', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class OnboardingComponent implements OnInit {

  @ViewChild(StepsVisualizerComponent) stepsVisualizer: StepsVisualizerComponent | undefined = undefined;

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    if (location.pathname === "/app/onboarding") {
      if (document.getElementById('cdk-overlay-0')) {
        document.getElementById('cdk-overlay-0')!.innerHTML = ''; //close overlays of select, tooltips, etc
      }
      this.goBack();
    }
  }

  userType: USER_TYPE|undefined;
  isCreator: boolean = true;
  data: any = {};
  slide: SLIDE = SLIDE.PERSONAL_INFO;
  SLIDE = SLIDE;

  personalInfoSlide: string = 'in';
  contentSlide: string = 'out';
  youtubeSlide: string = 'out'
  integrationLoading: boolean = false;
  animationDoneSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private sessionStorage: SessionStorageService,
    private onboardingService: OnboardingService,
    private router: Router,
    private profileService: ProfileService,
    private locationUtilsService: LocationUtilsService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.locationUtilsService.changePreviousPage(window, location, '/app/onboarding');
  }

  ngOnInit() {
    this.getUserType();
  }

  private async getUserType() {
    const userTypeObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
    if (userTypeObs) {
      this.userType = await firstValueFrom(userTypeObs);
      if (this.userType === USER_TYPE.ADVERTISER) this.isCreator = false;
    }
  }

  animationStarted($event: any) {
    if ($event.fromState === 'out' && $event.toState === 'in') {
      this.animationDoneSubject.next('started');
    }
  }

  animationDone($event: any) {
    if ($event.fromState === 'out' && $event.toState === 'in') {
      this.animationDoneSubject.next('done');
    }
  }

  goBack() {
    if (this.slide === SLIDE.CONTENT) {
      this.personalInfoSlide = 'in';
      this.contentSlide = 'out';
      this.slide = SLIDE.PERSONAL_INFO;
      this.stepsVisualizer?.setFirstStepCompleted(false);
      this.stepsVisualizer?.setSecondStepCompleted(false);
    }
    if (this.slide === SLIDE.YOUTUBE_INTEGRATION) {
      this.contentSlide = 'in';
      this.youtubeSlide = 'out';
      this.slide = SLIDE.CONTENT;
      this.stepsVisualizer?.setSecondStepCompleted(false);
    }
  }

  submitEvent($event: any) {
    if ($event.isStepCompleteOnly) {
      this.completeStepVisualizer($event);
      return;
    }
    if ($event.slide === SLIDE.PERSONAL_INFO) {
      this.data = {...this.data, ...$event};
      this.personalInfoSlide = 'out';
      this.contentSlide = 'in';
      this.slide = SLIDE.CONTENT;
      this.stepsVisualizer?.setFirstStepCompleted(true);
    }
    if ($event.slide === SLIDE.CONTENT) {
      this.data = {...this.data, ...$event};
      if (this.userType === USER_TYPE.CREATOR) {
        this.contentSlide = 'out';
        this.youtubeSlide = 'in';
        this.slide = SLIDE.YOUTUBE_INTEGRATION;
        this.stepsVisualizer?.setSecondStepCompleted(true);
      } else {
        const payload: OnboardingModel = {
          description: this.data.description,
          username: this.data.username,
          contentTags: this.data.tags,
          networks: this.data.networks?.map((net: any) => { return { platform: net.icon.toUpperCase(), url: net.url }})
        }
        this.onboardingService.completeOnboarding$(payload).subscribe({
          next: (v) => {
            let userData = v.body;
            this.profileService.setProfileData(userData);
            this.router.navigate(['app/profile']);
            this.sessionStorage.set(SESSION_STORAGE_KEYS.show_header_actions, 'FULL');
          },
          error: () => {
            this.dialog.open(InformationModalComponent, {
              width: '600px',
              data: {
                icon: 'warning',
                text: this.translate.instant('onboarding.onboarding_error'),
                textButtonClose: this.translate.instant('general.btn_return')
              }
            });
          }
        });
      }
    }
    if ($event.slide === SLIDE.YOUTUBE_INTEGRATION) {
      if ($event.state === 'loading') {
        this.integrationLoading = true;
      }
      if ($event.state === 'init') {
        this.integrationLoading = false;
      }
      if ($event.state === 'completed') {
        const payload: OnboardingModel = {
          birthDate: this.data.birthdate?.toISOString().substring(0, 10),
          description: this.data.description,
          username: this.data.username,
          contentTags: this.data.tags,
          networks: this.data.networks?.map((net: any) => { return { platform: net.icon.toUpperCase(), url: net.url }}),
          networkIntegratedId: $event.networkIntegratedId
        }
        this.onboardingService.completeOnboarding$(payload).subscribe({
          next: (v) => {
            let userData = v.body;
            this.profileService.setProfileData(userData);
            this.router.navigate(['app/profile']);
            this.sessionStorage.set(SESSION_STORAGE_KEYS.show_header_actions, 'FULL');
          },
          error: () => {
            //TODO: falla el save de los datos. Implementar lógica de reintento
          }
        });
      }
    }
  }

  private completeStepVisualizer($event: any) {
    if ($event.slide === SLIDE.PERSONAL_INFO) {
      this.stepsVisualizer?.setFirstStepCompleted($event.valid);
    }
    if ($event.slide === SLIDE.CONTENT) {
      this.stepsVisualizer?.setSecondStepCompleted($event.valid);
    }
  }

}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { SessionStorageService, SESSION_STORAGE_KEYS } from 'src/app/shared/services/storages/session-storage.service';
import { StepsVisualizerComponent } from './steps-visualizer/steps-visualizer.component';
import { OnboardingService } from './services/onboarding.service';
import { OnboardingModel } from './models/onboarding.model';
import { Router } from '@angular/router';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';


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
    trigger('networksSlide', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('* => *', animate(300))
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
    if (location.pathname === "/onboarding") {
      if (document.getElementById('cdk-overlay-0')) {
        document.getElementById('cdk-overlay-0')!.innerHTML = ''; //close overlays of select, tooltips, etc
      }
      this.goBack();
    }
  }

  userType: USER_TYPE|undefined;
  userTypeString: string = '';
  isCreator: boolean = true;
  data: any = {};
  slide: SLIDE = SLIDE.PERSONAL_INFO;
  SLIDE = SLIDE;

  personalInfoSlide: string = 'in';
  networksSlide: string = 'out';
  contentSlide: string = 'out';
  youtubeSlide: string = 'out'
  integrationLoading: boolean = false;
  animationDoneSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private sessionStorage: SessionStorageService,
    private onboardingService: OnboardingService,
    private router: Router
  ) {
    this.changePreviousPage(window, location);
  }

  ngOnInit() {
    this.getUserType();
  }

  private changePreviousPage(window: any, location: any) {
    history.pushState(null, document.title, location.pathname);
    window.addEventListener("popstate", function() {
      if(location.pathname === "/onboarding") {
        history.pushState(null, document.title, location.pathname);
      }
    }, false);
  }

  private async getUserType() {
    const userTypeObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
    if (userTypeObs) {
      this.userTypeString = await firstValueFrom(userTypeObs);
      this.userType = USER_TYPE[this.userTypeString as keyof typeof USER_TYPE];
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
    if (this.slide === SLIDE.NETWORKS) {
      this.personalInfoSlide = 'in';
      this.networksSlide = 'out';
      this.slide = SLIDE.PERSONAL_INFO;
      this.stepsVisualizer?.setFirstStepCompleted(false);
      this.stepsVisualizer?.setSecondStepCompleted(false);
    }
    if (this.slide === SLIDE.CONTENT) {
      this.networksSlide = 'in';
      this.contentSlide = 'out';
      this.slide = SLIDE.NETWORKS;
      this.stepsVisualizer?.setSecondStepCompleted(false);
      this.stepsVisualizer?.setThirdStepCompleted(false);
    }
    if (this.slide === SLIDE.YOUTUBE_INTEGRATION) {
      this.contentSlide = 'in';
      this.youtubeSlide = 'out';
      this.slide = SLIDE.CONTENT;
      this.stepsVisualizer?.setThirdStepCompleted(false);
    }
  }

  submitEvent($event: any) {
    if ($event.isStepCompleteOnly) {
      this.completeStepVisualizer($event);
      return;
    }
    if ($event.slide === SLIDE.PERSONAL_INFO) {
      this.data = {...$event};
      this.personalInfoSlide = 'out';
      this.networksSlide = 'in';
      this.slide = SLIDE.NETWORKS;
      this.stepsVisualizer?.setFirstStepCompleted(true);
    }
    if ($event.slide === SLIDE.NETWORKS) {
      this.data = {...$event, ...this.data};
      this.networksSlide = 'out';
      this.contentSlide = 'in';
      this.slide = SLIDE.CONTENT;
      this.stepsVisualizer?.setSecondStepCompleted(true);
    }
    if ($event.slide === SLIDE.CONTENT) {
      this.data = {...$event, ...this.data};
      if (this.userType === USER_TYPE.CREATOR) {
        this.contentSlide = 'out';
        this.youtubeSlide = 'in';
        this.slide = SLIDE.YOUTUBE_INTEGRATION;
        this.stepsVisualizer?.setThirdStepCompleted(true);
      } else {
        const payload: OnboardingModel = {
          description: this.data.description,
          userName: this.data.username,
          contentType: this.data.tags,
          socialNetworks: this.generateSocialNetworkObject(this.data.networks)
        }
        this.onboardingService.completeOnboarding$(payload).subscribe({
          next: (v) => {
            this.router.navigate(['/profile']);
            alert('profile component no creado');
          },
          error: (e) => {
            //TODO: falla el save de los datos. Implementar lógica de reintento
          }
        });
      }
    }
    if ($event.slide === SLIDE.YOUTUBE_INTEGRATION) {
      if ($event.state === 'loading') {
        this.integrationLoading = true;
      }
      if ($event.state === 'completed') {
        const payload: OnboardingModel = {
          birthDate: this.data.birthdate?.toISOString().substring(0, 10),
          description: this.data.description,
          userName: this.data.username,
          contentType: this.data.tags,
          socialNetworks: this.generateSocialNetworkObject(this.data.networks)
        }
        this.onboardingService.completeOnboarding$(payload).subscribe({
          next: (v) => {
            this.router.navigate(['/profile']);
            alert('profile component no creado');
          },
          error: (e) => {
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
    if ($event.slide === SLIDE.NETWORKS) {
      this.stepsVisualizer?.setSecondStepCompleted($event.valid);
    }
    if ($event.slide === SLIDE.CONTENT) {
      this.stepsVisualizer?.setThirdStepCompleted($event.valid);
    }
  }

  private generateSocialNetworkObject(networks: any) {
    let object: any = {};
    networks.forEach((network: any) => {
      object[network.icon + 'Url'] = network.url;
    });
    return object;
  }
}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { SessionStorageService, SESSION_STORAGE_KEYS } from 'src/app/shared/services/storages/session-storage.service';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { StepsVisualizerComponent } from './steps-visualizer/steps-visualizer.component';

export enum SLIDE { PERSONAL_INFO, NETWORKS, CONTENT };
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  animations: [
    trigger('personalInfoSlide', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
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
    ])
  ]
})
export class OnboardingComponent implements OnInit {

  @ViewChild(StepsVisualizerComponent) stepsVisualizer: StepsVisualizerComponent | undefined = undefined;

  userType: string|undefined;
  data: any = {};
  slide: SLIDE = SLIDE.PERSONAL_INFO;
  SLIDE = SLIDE;

  personalInfoSlide: string = 'in';
  networksSlide: string = 'out';
  contentSlide: string = 'out';
  animationDoneSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.getUserType();
  }

  private async getUserType() {
    const userTypeObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_type);
    if (userTypeObs) {
      this.userType = await firstValueFrom(userTypeObs);
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

  submitEvent($event: any) {
    this.data = {...$event};
    if ($event.slide === SLIDE.PERSONAL_INFO) {
      this.personalInfoSlide = 'out';
      this.networksSlide = 'in';
      this.slide = SLIDE.NETWORKS;
      this.stepsVisualizer?.setFirstStepCompleted(true);
    }
    if ($event.slide === SLIDE.NETWORKS) {
      this.networksSlide = 'out';
      this.contentSlide = 'in';
      this.slide = SLIDE.CONTENT;
      this.stepsVisualizer?.setSecondStepCompleted(true);
    }

  }
}

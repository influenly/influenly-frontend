import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { SessionStorageService, SESSION_STORAGE_KEYS } from 'src/app/shared/services/storages/session-storage.service';
import { StepsVisualizerComponent } from './steps-visualizer/steps-visualizer.component';


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

  userType: string|undefined;
  data: any = {};
  slide: SLIDE = SLIDE.YOUTUBE_INTEGRATION;
  SLIDE = SLIDE;

  personalInfoSlide: string = 'out';
  networksSlide: string = 'out';
  contentSlide: string = 'out';
  youtubeSlide: string = 'in'
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

  goBack() {
    if (this.slide === SLIDE.NETWORKS) {
      this.personalInfoSlide = 'in';
      this.networksSlide = 'out';
      this.slide = SLIDE.PERSONAL_INFO;
      this.stepsVisualizer?.setFirstStepCompleted(false);
    }
    if (this.slide === SLIDE.CONTENT) {
      this.networksSlide = 'in';
      this.contentSlide = 'out';
      this.slide = SLIDE.NETWORKS;
      this.stepsVisualizer?.setSecondStepCompleted(false);
    }
    if (this.slide === SLIDE.YOUTUBE_INTEGRATION) {
      this.contentSlide = 'in';
      this.youtubeSlide = 'out';
      this.slide = SLIDE.CONTENT;
      this.stepsVisualizer?.setThirdStepCompleted(false);
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
    if ($event.slide === SLIDE.CONTENT) {
      this.contentSlide = 'out';
      this.youtubeSlide = 'in';
      this.slide = SLIDE.YOUTUBE_INTEGRATION;
      this.stepsVisualizer?.setThirdStepCompleted(true);
    }
  }
}

import { IntegrationModel } from '../models/integration.model';
import { SLIDE } from '../onboarding.component';
import { OnboardingService } from '../services/onboarding.service';
import { Component, EventEmitter, Output } from '@angular/core';

declare var initTokenClient: Function;
declare var getToken: Function;
@Component({
  selector: 'app-youtube-integration',
  templateUrl: './youtube-integration.component.html',
  styleUrls: ['./youtube-integration.component.scss']
})
export class YoutubeIntegrationComponent {

  @Output() continue: EventEmitter<any> = new EventEmitter();

  state: string = 'init';

  constructor(private onboardingService: OnboardingService) {}
  
  async submit() {
    await initTokenClient(async (response: any) => {
      this.state = 'loading';
      let integrationData = {
        slide: SLIDE.YOUTUBE_INTEGRATION,
        state: this.state,
        networkIntegratedId: 0
      }
      this.continue.emit(integrationData);

      const payload: IntegrationModel = {
        authorizationCode : response.code,
        platform: 'YOUTUBE'
      }
      this.onboardingService.integration$(payload).subscribe({
        next: (v) => {
          integrationData.state = 'completed';
          integrationData.networkIntegratedId = v.body.networkIntegratedId;
          this.continue.emit(integrationData);
        },
        error: (e) => {
          if (e.error?.message === 'Network already integrated') {
            integrationData.state = 'completed';
            this.continue.emit(integrationData);
          } else {
            //TODO: falla el save de la integracion. Notificar el error
            this.state = 'error';
          }
        }
      });
    });
    getToken();
  }

  retry() {
    this.state = 'init';
    let integrationData = {
      slide: SLIDE.YOUTUBE_INTEGRATION,
      state: this.state,
      networkIntegratedId: 0
    }
    this.continue.emit(integrationData);
  }
    
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  @Input() userType: USER_TYPE|undefined;
  @Output() continue: EventEmitter<any> = new EventEmitter();

  icons: string[] = ['youtube', 'instagram', 'twitter'];
  networks: any = [];
  textObject = {
    paragraph: ''
  }

  networksForm: FormGroup = this.fb.group({
    icon: ['youtube'],
    url: ['', Validators.pattern('^(?:https?:\/\/)?(www\.)?(instagram|youtube|twitter)\.com\/(channel\/)?@?(?<person>[A-z0-9_-]+\/?)$')]
  });

  get icon() { return this.networksForm.get('icon'); }
  get url() { return this.networksForm.get('url'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService) { }

  ngOnInit() {
    this.loadTextByUserType();
  }

  private loadTextByUserType() {
    if (this.userType === USER_TYPE.CREATOR) {
      this.textObject.paragraph = this.translate.instant('onboarding.networks.paragraph_creator');
    } else {
      this.textObject.paragraph = this.translate.instant('onboarding.networks.paragraph_advertiser');
    }
  }

  add() {
    const network = {
      icon: this.icon?.value,
      url: this.url?.value
    }
    this.networks.push(network);
    this.url?.setValue('');
    this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.NETWORKS, valid: true});
  }

  remove(network: any) {
    var index = this.networks.indexOf(network);
    if (index > -1) {
      this.networks.splice(index, 1);
    }
    if (this.networks.length === 0) {
      this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.NETWORKS, valid: false});
    }
    
    return network;
  }

  selectNetworkIcon(event: Event) {
    if ((event.target as HTMLInputElement).value.includes('youtube')) {
      this.icon?.setValue('youtube');
    }
    if ((event.target as HTMLInputElement).value.includes('instagram')) {
      this.icon?.setValue('instagram');
    }
    if ((event.target as HTMLInputElement).value.includes('twitter')) {
      this.icon?.setValue('twitter');
    }
  }
  
  submit() {
    const networksData = {
      slide: SLIDE.NETWORKS,
      networks: this.networks
    }
    this.continue.emit(networksData);
  }
}

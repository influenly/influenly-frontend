import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SLIDE } from '../onboarding.component';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { NetworksFormComponent } from './networks-form/networks-form.component';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  @ViewChild(NetworksFormComponent) networksForm: NetworksFormComponent | undefined = undefined;

  @Input() userType: USER_TYPE|undefined;
  @Output() continue: EventEmitter<any> = new EventEmitter();

  textObject = {
    paragraph: ''
  }

  constructor(private translate: TranslateService) { }

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

  submit() {
    const networksData = {
      slide: SLIDE.NETWORKS,
      networks: this.networksForm?.networks
    }
    this.continue.emit(networksData);
  }
}

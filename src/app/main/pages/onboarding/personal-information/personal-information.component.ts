import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';
import { TranslateService } from '@ngx-translate/core';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnChanges, OnDestroy {

  @Input() userType: USER_TYPE|undefined;
  @Output() continue: EventEmitter<any> = new EventEmitter();

  textObject = {
    title: '',
    paragraph: '',
    username_label: '',
    description_placeholder: ''
  }
  isCreator: boolean = false;

  formStatusChangeSubs: Subscription|undefined;

  personalInfoForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    birthdate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  get username() { return this.personalInfoForm.get('username'); }
  get birthdate() { return this.personalInfoForm.get('birthdate'); }
  get description() { return this.personalInfoForm.get('description'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService) {}

  ngOnInit() {
    this.formStatusChangeSubs = this.personalInfoForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.PERSONAL_INFO, valid: true});
      } else {
        this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.PERSONAL_INFO, valid: false });
      }
    });
  }

  ngOnChanges() {
    this.loadTextByUserType();
  }

  private loadTextByUserType() {
    if (typeof this.userType == 'undefined') {
      return;
    }
    if (this.userType === USER_TYPE.CREATOR) {
      this.isCreator = true;
      this.textObject.title = this.translate.instant('onboarding.personal_information.title_creator');
      this.textObject.paragraph = this.translate.instant('onboarding.personal_information.paragraph_creator');
      this.textObject.username_label = this.translate.instant('onboarding.personal_information.username.label_creator');
      this.textObject.description_placeholder = this.translate.instant('onboarding.personal_information.description.placeholder_creator');
    } else {
      this.personalInfoForm.removeControl('birthdate');
      this.textObject.title = this.translate.instant('onboarding.personal_information.title_advertiser');
      this.textObject.paragraph = this.translate.instant('onboarding.personal_information.paragraph_advertiser');
      this.textObject.username_label = this.translate.instant('onboarding.personal_information.username.label_advertiser');
      this.textObject.description_placeholder = this.translate.instant('onboarding.personal_information.description.placeholder_advertiser');
    }
  }

  submit() {
    const personalInfoData = {
      slide: SLIDE.PERSONAL_INFO,
      username: this.username?.value,
      birthdate: this.birthdate?.value,
      description: this.description?.value
    }
    this.continue.emit(personalInfoData);
  }

  ngOnDestroy() {
    if (this.formStatusChangeSubs) this.formStatusChangeSubs.unsubscribe();
  }
}

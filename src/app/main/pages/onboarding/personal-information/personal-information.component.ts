import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';
import { TranslateService } from '@ngx-translate/core';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnChanges {

  @Input() userType: USER_TYPE|undefined;
  @Output() continue: EventEmitter<any> = new EventEmitter();

  textObject = {
    title: '',
    paragraph: '',
    username_label: '',
    description_placeholder: ''
  }
  isCreator: boolean = false;

  personalInfoForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-z0-9]+$')]],
    birthdate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  get username() { return this.personalInfoForm.get('username'); }
  get birthdate() { return this.personalInfoForm.get('birthdate'); }
  get description() { return this.personalInfoForm.get('description'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService) {}

  ngOnChanges() {
    this.loadTextByUserType();
  }

  private loadTextByUserType() {
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
}

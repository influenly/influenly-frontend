import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';
import { TranslateService } from '@ngx-translate/core';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

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
  birthdatePrevInputValue = '';

  formStatusChangeSubs: Subscription|undefined;

  personalInfoForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\'\\s]+$')]],
    birthdate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  get username() { return this.personalInfoForm.get('username'); }
  get birthdate() { return this.personalInfoForm.get('birthdate'); }
  get description() { return this.personalInfoForm.get('description'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr-FR'); 
  }

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

  inputChange($event: any) {
    let inputValue = $event.target.value;
    if (inputValue && !/[0-9]/.test(inputValue.charAt(inputValue.length - 1))) {
      inputValue = $event.target.value = inputValue.substr(0, inputValue.length - 1);
    }
    const regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    if (regex.test(inputValue)) {
      const [day, month, year] = inputValue.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      this.birthdate?.setValue(date);
    } else if (this.birthdatePrevInputValue.length < inputValue.length && (inputValue.length === 2 || inputValue.length === 5)) {
      $event.target.value += '/';
    }
    this.birthdatePrevInputValue = $event.target.value;
  }

  ngOnDestroy() {
    if (this.formStatusChangeSubs) this.formStatusChangeSubs.unsubscribe();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {

  @Output() continue: EventEmitter<any> = new EventEmitter();

  personalInfoForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-z0-9]+$')]],
    birthdate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  get username() { return this.personalInfoForm.get('username'); }
  get birthdate() { return this.personalInfoForm.get('birthdate'); }
  get description() { return this.personalInfoForm.get('description'); }

  constructor(private fb: FormBuilder) {}

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

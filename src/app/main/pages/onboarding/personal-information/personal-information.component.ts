import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {

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
    
  }
}

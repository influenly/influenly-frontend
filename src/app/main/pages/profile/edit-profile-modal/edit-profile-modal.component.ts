import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NetworksFormComponent } from '../../onboarding/networks/networks-form/networks-form.component';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  @ViewChild(NetworksFormComponent) networksForm: NetworksFormComponent | undefined = undefined;

  isCreatorView: boolean|undefined;
  textObject = {
    title: '',
    username_label: '',
    description_placeholder: ''
  }

  userDataForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-z0-9]+$')]],
    birthdate: ['', [Validators.required]],
    description: ['', [Validators.required]],
    icon: ['youtube'],
    url: ['', Validators.pattern('^(?:https?:\/\/)?(www\.)?(instagram|youtube|twitter)\.com\/(channel\/)?@?(?<person>[A-z0-9_-]+\/?)$')]
  });

  get username() { return this.userDataForm.get('username'); }
  get birthdate() { return this.userDataForm.get('birthdate'); }
  get description() { return this.userDataForm.get('description'); }
  get icon() { return this.userDataForm.get('icon'); }
  get url() { return this.userDataForm.get('url'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService,
              public dialogRef: MatDialogRef<EditProfileModalComponent>) {}

  ngOnInit() {
    this.loadTranslations();
  }

  private loadTranslations() {
    if (this.isCreatorView) {
      this.textObject.username_label = this.translate.instant('onboarding.personal_information.username.label_creator');
      this.textObject.description_placeholder = this.translate.instant('onboarding.personal_information.description.placeholder_creator');
    } else {
      this.textObject.username_label = this.translate.instant('onboarding.personal_information.username.label_advertiser');
      this.textObject.description_placeholder = this.translate.instant('onboarding.personal_information.description.placeholder_advertiser');
    }
  }

  public save() {
    let data = {
      username: this.username?.value,
      description: this.description?.value,
      networks: this.networksForm?.networks,
    }
    console.log(data)
  }

  public close() {
    this.dialogRef.close();
  }

}

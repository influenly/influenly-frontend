import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NetworksFormComponent } from '../../onboarding/networks/networks-form/networks-form.component';
import { ContentFormComponent } from '../../onboarding/content/content-form/content-form.component';
import { ProfileService } from '../services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(NetworksFormComponent) networksForm: NetworksFormComponent | undefined = undefined;
  @ViewChild(ContentFormComponent) contentForm: ContentFormComponent | undefined = undefined;

  isCreatorView: boolean|undefined;
  textObject = {
    title: '',
    username_label: '',
    description_placeholder: ''
  }
  disabledButton: boolean = true;

  formOnChangesSubs: (Subscription|undefined)[] = [];

  userDataForm: FormGroup = this.fb.group({
    username: [this.data.username, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    birthdate: ['', [Validators.required]],
    description: [this.data.description, [Validators.required]]
  });

  get username() { return this.userDataForm.get('username'); }
  get birthdate() { return this.userDataForm.get('birthdate'); }
  get description() { return this.userDataForm.get('description'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService,
              public dialogRef: MatDialogRef<EditProfileModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private profileService: ProfileService) {}

  ngOnInit() {
    this.loadTranslations();
  }

  ngAfterViewInit() {
    this.loadUserDataToForm();
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
  
  private loadUserDataToForm() {
    setTimeout(() => {
      this.contentForm?.tags?.setValue(this.data.contentTags);
      this.formOnChangesSubs.push(this.contentForm?.contentForm.valueChanges.subscribe(() => {
        this.disabledButton = false;
      }));
    }, 0);
    let socialNetworks = this.profileService.loadSocialNetworks(this.data?.socialNetworks);
    socialNetworks.forEach(network => {
      this.networksForm?.networks.push({ url: network.link, icon: network.icon });
    });
    this.formOnChangesSubs.push(this.userDataForm.valueChanges.subscribe(() => {
      this.disabledButton = false;
    }));
  }

  networksEvent() {
    this.disabledButton = false;
  }

  public save() {
    let data = {
      username: this.username?.value,
      description: this.description?.value,
      networks: this.networksForm?.networks,
      tags: this.contentForm?.tags?.value
    }
    console.log(data)
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.formOnChangesSubs) this.formOnChangesSubs.forEach(subs => subs?.unsubscribe());
  }

}

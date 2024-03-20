import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NetworksFormComponent } from '../../onboarding/networks/networks-form/networks-form.component';
import { ContentFormComponent } from '../../onboarding/content/content-form/content-form.component';
import { ProfileService } from '../services/profile.service';
import { Subscription } from 'rxjs';
import { ProfileRequestService } from '../services/profile-request.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { OnboardingModel } from '../../onboarding/models/onboarding.model';
import { UserModel } from '../models/user-data.model';

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
    username: [this.data.username, [Validators.required, Validators.pattern('^[a-zA-Z0-9\']+$')]],
    birthdate: ['', [Validators.required]],
    description: [this.data.description, [Validators.required]]
  });

  get username() { return this.userDataForm.get('username'); }
  get birthdate() { return this.userDataForm.get('birthdate'); }
  get description() { return this.userDataForm.get('description'); }

  constructor(private fb: FormBuilder,
              private translate: TranslateService,
              public dialogRef: MatDialogRef<EditProfileModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserModel,
              private profileService: ProfileService,
              private profileRequestService: ProfileRequestService,
              private dialog: MatDialog) {}

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
    let networks = this.profileService.loadSocialNetworks(this.data?.networks);
    networks.forEach(network => {
      this.networksForm?.networks?.push({ url: network.link, icon: network.icon, integrated: network.integrated });
    });
    this.formOnChangesSubs.push(this.userDataForm.valueChanges.subscribe(() => {
      this.disabledButton = false;
    }));
  }

  networksEvent() {
    this.disabledButton = false;
  }

  public save() {
    const newNetworksArray = this.getNewArrayIfExistsChanges(this.data.networks.map((net: any) => net.url), this.networksForm?.networks?.map((net: any) => net.url));
    const networks = newNetworksArray ? this.networksForm?.networks?.map((net: any) => { return { platform: net.icon.toUpperCase(), url: net.url }}) : undefined;
    let data: OnboardingModel = {
      username: this.data.username != this.username?.value ? this.username?.value : undefined,
      description: this.data.description != this.description?.value ? this.description?.value : undefined,
      networks: networks,
      contentTags: this.data.contentTags != this.contentForm?.tags?.value ? this.contentForm?.tags?.value : undefined
    }
    this.profileRequestService.updateProfileData$(data).subscribe({
      next: (v) => {
        this.profileService.setProfileData(v.body);
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'check',
            title: this.translate.instant('profile.edit.success_title'),
            textButtonClose: this.translate.instant('general.btn_accept')
          }
        });
        this.dialogRef.close();
      },
      error: (e) => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            title: this.translate.instant('profile.edit.error_title'),
            textButtonClose: this.translate.instant('general.btn_accept')
          }
        });
        //TODO: falla el save de los datos. Implementar lógica de reintento
      }
    });
    console.log(data)
  }

  private getNewArrayIfExistsChanges(arr1: any[], arr2?: any[]): any[]|undefined {
    arr1.sort();
    arr2?.sort();
    if (arr1.length == arr2?.length && arr1.every(function(v,i) { return v === arr2[i] } )) {
      return undefined;
    }
    return arr2;
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.formOnChangesSubs) this.formOnChangesSubs.forEach(subs => subs?.unsubscribe());
  }

}

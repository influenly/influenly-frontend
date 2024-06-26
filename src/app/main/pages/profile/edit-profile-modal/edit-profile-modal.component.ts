import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ContentFormComponent } from '../../onboarding/content/content-form/content-form.component';
import { ProfileService } from '../services/profile.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { ProfileRequestService } from '../services/profile-request.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { OnboardingModel } from '../../onboarding/models/onboarding.model';
import { UserModel } from '../models/user-data.model';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ContentFormComponent) contentForm: ContentFormComponent | undefined = undefined;

  profileImage: string | ArrayBuffer | null = null;
  file: File | undefined;
  isCreatorView: boolean|undefined;
  textObject = {
    title: '',
    username_label: '',
    description_placeholder: ''
  }
  disabledButton: boolean = true;

  formOnChangesSubs: (Subscription|undefined)[] = [];

  userDataForm: FormGroup = this.fb.group({
    username: [this.data.username, [Validators.required, Validators.pattern('^[a-zA-Z0-9\'\\s]+$')]],
    birthdate: ['', [Validators.required]],
    description: [this.data.description, [Validators.required]]
  });

  get username() { return this.userDataForm.get('username'); }
  get birthdate() { return this.userDataForm.get('birthdate'); }
  get description() { return this.userDataForm.get('description'); }

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private profileService: ProfileService,
    private profileRequestService: ProfileRequestService,
    private dialog: MatDialog,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit() {
    this.loadTranslations();
  }

  ngAfterViewInit() {
    this.loadUserDataToForm();
  }

  private loadTranslations() {
    this.isCreatorView = this.data?.type === USER_TYPE.CREATOR;
    if (this.isCreatorView) {
      this.textObject.username_label = this.translate.instant('onboarding.personal_information.username.label_creator');
      this.textObject.description_placeholder = this.translate.instant('onboarding.personal_information.description.placeholder_creator');
    } else {
      this.textObject.username_label = this.translate.instant('onboarding.personal_information.username.label_advertiser');
      this.textObject.description_placeholder = this.translate.instant('onboarding.personal_information.description.placeholder_advertiser');
    }
  }
  
  private loadUserDataToForm() {
    this.profileImage = this.data.profileImg ? this.data.profileImg : null;
    setTimeout(() => {
      this.contentForm?.setTagsValue(this.data.contentTags);
      this.formOnChangesSubs.push(this.contentForm?.contentForm.valueChanges.subscribe(() => {
        this.disabledButton = false;
      }));
    }, 0);
    this.formOnChangesSubs.push(this.userDataForm.valueChanges.subscribe(() => {
      this.disabledButton = false;
    }));
  }

  public async save() {
    let imgUrl;
    if (this.file) {
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);
      const imageSaveResponse$ = this.profileRequestService.saveProfileImg$(formData);
      const res = await lastValueFrom(imageSaveResponse$);
      if (res.body.ok) {
        imgUrl = res.body.data?.url;
        console.log(imgUrl);
      } else {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            title: this.translate.instant('profile.edit.error_title'),
            textButtonClose: this.translate.instant('general.btn_accept')
          }
        });
        return;
      }
    }
    let data: OnboardingModel = {
      username: this.data.username != this.username?.value ? this.username?.value : undefined,
      description: this.data.description != this.description?.value ? this.description?.value : undefined,
      contentTags: JSON.stringify(this.data.contentTags) != JSON.stringify(this.contentForm?.tags?.value) ? this.contentForm?.tags?.value : undefined,
    }
    if (imgUrl) {
      data.profileImg = imgUrl;
    }
    this.profileRequestService.updateProfileData$(data).subscribe({
      next: async (v) => {
        const responseUsername = v.body?.data.user.username;
        if (responseUsername != this.data.username) {
          this.sessionStorage.set(SESSION_STORAGE_KEYS.username, responseUsername);
        }
        
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

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
        this.profileImage = reader.result; 
    }
    this.disabledButton = false;
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.formOnChangesSubs) this.formOnChangesSubs.forEach(subs => subs?.unsubscribe());
  }

}

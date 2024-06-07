import { AfterViewInit, Component, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CampaignModel } from '../models/campaign.model';
import { ContentFormComponent } from '../../onboarding/content/content-form/content-form.component';
import { TranslateService } from '@ngx-translate/core';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { CampaignService } from '../services/campaign.service';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-new-campaign-modal',
  templateUrl: './new-campaign-modal.component.html',
  styleUrls: ['./new-campaign-modal.component.scss']
})
export class NewCampaignModalComponent implements AfterViewInit, OnDestroy {

  @ViewChild(ContentFormComponent) contentForm: ContentFormComponent | undefined = undefined;

  @Output() result: EventEmitter<boolean> = new EventEmitter();

  disabledButton: boolean = true;
  endDatePrevInputValue = '';

  formOnChangesSubs: (Subscription | undefined)[] = [];

  campaignForm: FormGroup = this.fb.group({
    name: [this.data?.name, [Validators.required, Validators.pattern('^[a-zA-Z0-9\'\\s]+$')]],
    description: [this.data?.description, [Validators.required]],
    tags: [this.data?.contentTags, [Validators.required]],
    endDate: [this.data?.endDate, [Validators.required]]
  });

  get name() { return this.campaignForm.get('name'); }
  get description() { return this.campaignForm.get('description'); }
  get tags() { return this.campaignForm.get('tags'); }
  get endDate() { return this.campaignForm.get('endDate'); }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCampaignModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CampaignModel,
    private translate: TranslateService,
    private dialog: MatDialog,
    private campaignService: CampaignService,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB'); 
    }

  ngAfterViewInit() {
    this.loadTagsForm();
  }

  private loadTagsForm() {
    setTimeout(() => {
      if (this.data) {
        this.contentForm?.setTagsValue(this.data.contentTags);
      }
      this.formOnChangesSubs.push(this.contentForm?.contentForm.valueChanges.subscribe(() => {
        this.tags?.setValue(this.contentForm?.tags?.value);
      }));
    }, 0);
  }

  // TODO: Create this function in a service
  inputChange($event: any) {
    let inputValue = $event.target.value;
    if (inputValue.length == 2 && inputValue.charAt(inputValue.length - 1) == '/') {
      inputValue = $event.target.value = '0' + inputValue.substr(0, inputValue.length - 1);
    } else if (inputValue.length == 5 && inputValue.charAt(inputValue.length - 1) == '/') {
      inputValue = $event.target.value = inputValue.substr(0, inputValue.length - 2) + '0' + inputValue.substr(inputValue.length -2, inputValue.length -1);
    } else if (this.endDatePrevInputValue.length < inputValue.length && inputValue && !/[0-9]/.test(inputValue.charAt(inputValue.length - 1))) {
      inputValue = $event.target.value = inputValue.substr(0, inputValue.length - 1);
    } else if (this.endDatePrevInputValue.length > inputValue.length && (inputValue.length === 2 || inputValue.length === 5)) {
      inputValue = $event.target.value = inputValue.substr(0, inputValue.length - 1);
    }
    const regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    if (regex.test(inputValue)) {
      const [day, month, year] = inputValue.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      this.endDate?.setValue(date);
    } else if (this.endDatePrevInputValue.length < inputValue.length && (inputValue.length === 2 || inputValue.length === 5)) {
      $event.target.value += '/';
    }
    this.endDatePrevInputValue = $event.target.value;
  }

  save() {
    if (this.data) {
      //TODO: PATCH para edit
    } else {
      let data: CampaignModel = {
        name: this.name?.value,
        description: this.description?.value,
        contentTags: this.contentForm?.tags?.value,
        endDate: this.endDate?.value.toISOString().substring(0, 10)
      }
      this.campaignService.createCampaign$(data).subscribe({
        next: async (v) => {
          console.log(v)
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'check',
              title: this.translate.instant('campaigns.info.success_title'),
              textButtonClose: this.translate.instant('general.btn_accept')
            }
          });
          this.result.emit(true);
          this.dialogRef.close();
        },
        error: () => {
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'warning',
              title: this.translate.instant('campaigns.info.error_title'),
              textButtonClose: this.translate.instant('general.btn_accept')
            }
          });
        }
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.formOnChangesSubs) this.formOnChangesSubs.forEach(subs => subs?.unsubscribe());
  }

}

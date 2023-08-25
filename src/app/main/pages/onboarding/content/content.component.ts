import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SLIDE } from '../onboarding.component';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { ContentFormComponent } from './content-form/content-form.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @ViewChild(ContentFormComponent) contentForm: ContentFormComponent | undefined = undefined;

  @Input() userType: USER_TYPE|undefined;
  @Output() continue: EventEmitter<any> = new EventEmitter();

  textObject = {
    title: '',
    paragraph: '',
  }
  disabledButton: boolean = true;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadTextByUserType();
  }

  private loadTextByUserType() {
    if (this.userType === USER_TYPE.CREATOR) {
      this.textObject.title = this.translate.instant('onboarding.content.title_creator');
      this.textObject.paragraph = this.translate.instant('onboarding.content.paragraph_creator');
    } else {
      this.textObject.title = this.translate.instant('onboarding.content.title_advertiser');
      this.textObject.paragraph = this.translate.instant('onboarding.content.paragraph_advertiser');
    }
  }

  contentEvent(valid: boolean) {
    this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.CONTENT, valid: valid });
    this.disabledButton = !valid;
  }

  submit() {
    const contentData = {
      slide: SLIDE.CONTENT,
      tags: this.contentForm?.tags?.value
    }
    this.continue.emit(contentData);
  }
}

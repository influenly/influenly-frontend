import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() userType: USER_TYPE|undefined;
  @Output() continue: EventEmitter<any> = new EventEmitter();

  textObject = {
    title: '',
    paragraph: '',
  }

  contentForm: FormGroup = this.fb.group({
    tags: [[], Validators.required]
  });

  get tags() { return this.contentForm.get('tags'); }

  tagList: string[] = [
    'gaming',
    'music',
    'education',
    'comedy',
    'sports',
    'cooking',
    'art',
    'news',
    'trips',
    'finances',
    'culture',
    'business',
    'tech',
    'creative',
    'others'
  ]

  constructor(private fb: FormBuilder,
              private translate: TranslateService) {}

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

  add(tag: string) {
    const index = this.tagList.indexOf(tag);
    this.tagList.splice(index, 1);
    this.tags?.setValue(this.tags.value.concat(tag));
    this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.CONTENT, valid: true});
  }

  remove(tag: string) {
    this.tagList.push(tag);
    this.tags?.setValue(this.tags.value.filter((t: string) => t != tag));
    if (this.tags?.value.length === 0) {
      this.continue.emit({ isStepCompleteOnly: true, slide: SLIDE.CONTENT, valid: false});
    }
  }

  submit() {
    const contentData = {
      slide: SLIDE.CONTENT,
      tags: this.tags?.value
    }
    this.continue.emit(contentData);
  }
}

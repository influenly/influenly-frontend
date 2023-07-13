import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SLIDE } from '../onboarding.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  @Output() continue: EventEmitter<any> = new EventEmitter();

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

  constructor(private fb: FormBuilder) {}

  add(tag: string) {
    const index = this.tagList.indexOf(tag);
    this.tagList.splice(index, 1);
    this.tags?.setValue(this.tags.value.concat(tag));
  }

  remove(tag: string) {
    this.tagList.push(tag);
    this.tags?.setValue(this.tags.value.filter((t: string) => t != tag));
  }

  submit() {
    const contentData = {
      slide: SLIDE.CONTENT,
      tags: this.tags?.value
    }
    this.continue.emit(contentData);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent {

  @Input() otherLabel: string|undefined;
  @Output() atLeastOne: EventEmitter<boolean> = new EventEmitter();

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

  contentForm: FormGroup = this.fb.group({
    tags: [[], Validators.required]
  });

  get tags() { return this.contentForm.get('tags'); }

  constructor(private fb: FormBuilder) {}

  add(tag: string) {
    const index = this.tagList.indexOf(tag);
    this.tagList.splice(index, 1);
    this.tags?.setValue(this.tags.value.concat(tag));
    this.atLeastOne.emit(true);
  }

  remove(tag: string) {
    this.tagList.push(tag);
    this.tags?.setValue(this.tags.value.filter((t: string) => t != tag));
    if (this.tags?.value.length === 0) {
      this.atLeastOne.emit(false);
    }
  }

}

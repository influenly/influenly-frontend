import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/core/constants/app.constants';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent {

  @Input() otherLabel: string|undefined;
  @Output() atLeastOne: EventEmitter<boolean> = new EventEmitter();

  tagList: string[] = [...AppConstants.contentTags];

  contentForm: FormGroup = this.fb.group({
    tags: [[], Validators.required]
  });

  get tags() { return this.contentForm.get('tags'); }

  constructor(private fb: FormBuilder) {}

  setTagsValue(tags: string[]) {
    if (tags && tags.length > 0) {
      tags.forEach((tag: string) => {
        this.add(tag);
      });
    }
  }

  add(tag: string) {
    if (this.tags?.value.length === 5) {
      return;
    }
    const index = this.tagList.indexOf(tag);
    if (index !== -1) {
      this.tagList.splice(index, 1);
      this.tags?.setValue(this.tags.value.concat(tag));
      this.atLeastOne.emit(true);
    }
  }

  remove(tag: string) {
    this.tagList.push(tag);
    this.tags?.setValue(this.tags.value.filter((t: string) => t != tag));
    if (this.tags?.value.length === 0) {
      this.atLeastOne.emit(false);
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-init-talk-modal',
  templateUrl: './init-talk-modal.component.html',
  styleUrls: ['./init-talk-modal.component.scss']
})
export class InitTalkModalComponent {

  talkForm: FormGroup = this.fb.group({
    message: ['', Validators.required],
  });

  get message() { return this.talkForm.get('message'); }

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<InitTalkModalComponent>) {}

  onSubmit() {

  }

  close() {
    this.dialogRef.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { ChatRequestService } from '../../services/chat-request.service';

@Component({
  selector: 'app-init-talk-modal',
  templateUrl: './init-talk-modal.component.html',
  styleUrls: ['./init-talk-modal.component.scss']
})
export class InitTalkModalComponent implements OnInit {

  talkForm: FormGroup = this.fb.group({
    message: ['', Validators.required],
  });

  userId: string = '0';

  get message() { return this.talkForm.get('message'); }

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<InitTalkModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private chatRequestService: ChatRequestService) {}

  ngOnInit() {
    let href = this.router.url;
    this.userId = href.substring(href.lastIndexOf('/') + 1);
  }

  onSubmit() {
    const message = {
      advertiserUserId: this.data.type === USER_TYPE.CREATOR ? parseInt(this.userId) : this.data.userId,
      creatorUserId: this.data.type === USER_TYPE.CREATOR ? this.data.userId : parseInt(this.userId),
      message: this.message?.value
    }
    console.log(message)
    this.chatRequestService.newConversation$(message).subscribe({
      next: (v) => {
        this.dialogRef.close();
      },
      error: (e) => {
        //TODO: Flujo de error
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}

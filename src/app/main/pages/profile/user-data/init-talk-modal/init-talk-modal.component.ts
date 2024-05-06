import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatRequestService } from '../../services/chat-request.service';
import { firstValueFrom } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { UserModel } from '../../models/user-data.model';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-init-talk-modal',
  templateUrl: './init-talk-modal.component.html',
  styleUrls: ['./init-talk-modal.component.scss']
})
export class InitTalkModalComponent implements OnInit {

  talkForm: FormGroup = this.fb.group({
    message: ['', Validators.required],
  });

  userId: number|undefined;

  get message() { return this.talkForm.get('message'); }

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<InitTalkModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserModel,
              private chatRequestService: ChatRequestService,
              private sessionStorage: SessionStorageService,
              private translate: TranslateService) {}

  ngOnInit() {
    this.getUserId();
  }

  private async getUserId() {
    const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id);
    if (userIdObs) {
      this.userId = parseInt(await firstValueFrom(userIdObs));
    }
  }

  onSubmit() {
    const message = {
      creatorUserId: this.data.id,
      message: this.message?.value.trim()
    }
    console.log(message)
    this.chatRequestService.newConversation$(message).subscribe({
      next: (v) => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'check',
            text: this.translate.instant('profile.init_talk.message_sended_ok'),
            textButtonClose: this.translate.instant('general.btn_return')
          }
        });
        this.dialogRef.close();
      },
      error: (e) => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            text: this.translate.instant('profile.init_talk.message_sended_error'),
            textButtonClose: this.translate.instant('general.btn_return')
          }
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}

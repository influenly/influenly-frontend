import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USER_TYPE } from 'src/app/shared/models/user-type.enum';
import { ChatRequestService } from '../../services/chat-request.service';
import { firstValueFrom } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { SocketService } from 'src/app/shared/services/socket/socket.service';

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
              private dialogRef: MatDialogRef<InitTalkModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private chatRequestService: ChatRequestService,
              private sessionStorage: SessionStorageService,
              private socketService: SocketService) {}

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
      creatorUserId: this.data.userId,
      message: this.message?.value
    }
    console.log(message)
    this.chatRequestService.newConversation$(message).subscribe({
      next: (v) => {
        // this.socketService.emitMessage('sendMEssage', message);
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

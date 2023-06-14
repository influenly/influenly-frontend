import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss']
})
export class InformationModalComponent {

  @Output() response: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<InformationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { icon: string, title: string, text: string, textButtonOk: string, textButtonClose: string }) {}

  accept() {
    this.response.emit(true);
  }

  close() {
    this.response.emit(false);
    this.dialogRef.close();
  }
}

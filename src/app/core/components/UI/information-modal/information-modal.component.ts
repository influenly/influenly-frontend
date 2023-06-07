import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss']
})
export class InformationModalComponent {

  @Input() title: string = "";
  @Input() textButtonOk: string = "";

  accept() {
    
  }
}

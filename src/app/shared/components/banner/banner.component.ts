import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @Input() title: string ='';
  @Input() text: string = '';
  @Input() buttonLabel: string = '';
  @Input() buttonAction: () => void = () => {};

  action() {
    this.buttonAction();
  }
}

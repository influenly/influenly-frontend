import { Component } from '@angular/core';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss']
})
export class TalksComponent {

  talks: any|undefined = {
    pending: [
      {
        picture: undefined,
        username: 'Pepsi'
      }
    ]
  };
}

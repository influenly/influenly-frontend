import { Component, Input } from '@angular/core';
import { UserDataModel } from '../models/user-data.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

    @Input() userData: UserDataModel|undefined;

}

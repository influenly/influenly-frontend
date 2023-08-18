import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IntegratedNetworkModel } from '../models/user-data.model';

@Component({
  selector: 'app-network-selector',
  templateUrl: './network-selector.component.html',
  styleUrls: ['./network-selector.component.scss']
})
export class NetworkSelectorComponent {

  @Input() integratedNetworks: IntegratedNetworkModel[]|undefined;

  @Output() changeSelected: EventEmitter<IntegratedNetworkModel> = new EventEmitter();

  selectedIndex: number = 0;

  changeNetwork(network: IntegratedNetworkModel, index: number) {
    this.changeSelected.emit(network);
    this.selectedIndex = index;
  }

}

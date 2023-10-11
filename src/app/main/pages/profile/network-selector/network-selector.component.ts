import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NetworkProfileModel } from '../models/user-data.model';

@Component({
  selector: 'app-network-selector',
  templateUrl: './network-selector.component.html',
  styleUrls: ['./network-selector.component.scss']
})
export class NetworkSelectorComponent implements OnInit {

  @Input() networks: { platform: string, networks: NetworkProfileModel[] }[]|undefined;

  @Output() changeSelected: EventEmitter<{ platform: string, networks: NetworkProfileModel[] }> = new EventEmitter();

  selectedPlatform: string|undefined;

  ngOnInit() {
    this.selectedPlatform = this.networks ? this.networks[0].platform : undefined;
  }

  changeNetwork(network: { platform: string, networks: NetworkProfileModel[] }|undefined) {
    this.changeSelected.emit(network);
    this.selectedPlatform = network?.platform;
  }

}

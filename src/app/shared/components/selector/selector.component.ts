import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  @Input() options: {key: string, label: string }[] | undefined;
  @Input() isFloat: boolean = false;

  @Output() changeSelected: EventEmitter<{key: string, label: string }> = new EventEmitter();

  selected: string | undefined;

  ngOnInit() {
    this.selected = this.options ? this.options[0].key : undefined;
  }

  changeOption(option: {key: string, label: string } | undefined) {
    this.changeSelected.emit(option);
    this.selected = option?.key;
  }
}

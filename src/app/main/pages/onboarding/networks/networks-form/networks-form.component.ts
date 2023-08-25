import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-networks-form',
  templateUrl: './networks-form.component.html',
  styleUrls: ['./networks-form.component.scss']
})
export class NetworksFormComponent {

  icons: string[] = ['youtube', 'instagram', 'twitter'];
  networks: any = [];

  networksForm: FormGroup = this.fb.group({
    icon: ['youtube'],
    url: ['', Validators.pattern('^(?:https?:\/\/)?(www\.)?(instagram|youtube|twitter)\.com\/(channel\/)?@?(?<person>[A-z0-9_-]+\/?)$')]
  });

  get icon() { return this.networksForm.get('icon'); }
  get url() { return this.networksForm.get('url'); }

  constructor(private fb: FormBuilder) {}

  add() {
    const network = {
      icon: this.icon?.value,
      url: this.url?.value
    }
    this.networks.push(network);
    this.url?.setValue('');
  }

  remove(network: any) {
    var index = this.networks.indexOf(network);
    if (index > -1) {
      this.networks.splice(index, 1);
    }
    return network;
  }

  selectNetworkIcon(event: Event) {
    if ((event.target as HTMLInputElement).value.includes('youtube')) {
      this.icon?.setValue('youtube');
    }
    if ((event.target as HTMLInputElement).value.includes('instagram')) {
      this.icon?.setValue('instagram');
    }
    if ((event.target as HTMLInputElement).value.includes('twitter')) {
      this.icon?.setValue('twitter');
    }
  }

}

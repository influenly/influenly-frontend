import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-networks-form',
  templateUrl: './networks-form.component.html',
  styleUrls: ['./networks-form.component.scss']
})
export class NetworksFormComponent {

  @Output() atLeastOne: EventEmitter<boolean> = new EventEmitter();

  icons: string[] = ['youtube', 'instagram', 'twitter','tiktok','twitch','website'];
  networks: { url: string, icon: string, integrated: boolean }[]|undefined = [];

  networksForm: FormGroup = this.fb.group({
    icon: ['youtube'],
    url: ['', Validators.pattern('^(?:https?:\/\/)?(www\.)?((instagram|twitter|twitch)\.com\/[A-z0-9_-]+\/?$)|(((youtube\.com\/(channel\/)?)|(tiktok\.com\/))@?([A-z0-9_-]+)$)|(([a-z]{3}\.)?[a-z_-]+\.[a-z]{2,4}(\.[a-z]{2})?$)')]
  });

  get icon() { return this.networksForm.get('icon'); }
  get url() { return this.networksForm.get('url'); }

  constructor(private fb: FormBuilder) {}

  add() {
    const network = {
      icon: this.icon?.value,
      url: this.formatUrl(this.url?.value),
      integrated: false
    }
    this.networks?.push(network);
    this.url?.setValue('');
    this.atLeastOne.emit(true);
  }

  remove(network: any) {
    var index = this.networks?.indexOf(network);
    if (typeof index == 'number' && index > -1) {
      this.networks?.splice(index, 1);
    }
    if (this.networks?.length === 0) {
      this.atLeastOne.emit(false);
    } else {
      this.atLeastOne.emit(true);
    }
    return network;
  }

  private formatUrl(url: string) : string{
    if (url.charAt(url.length - 1) === '/') {
      url = url.slice(0, url.length - 1);
    }
    const [tld, domain, ...sub] = url.replace(/https?\:\/\//gi, '').split('.').reverse();
    const protocol = 'https://';
    const subDomain = sub.length === 2 ? `${sub[1]}.${sub[0]}.` : (sub.length) ? `${sub}.` : 'www.';
    return `${protocol}${subDomain}${domain}.${tld}`;
  }

  selectNetworkIcon(event: Event) {
    if ((event.target as HTMLInputElement).value.includes('youtube')) {
      this.icon?.setValue('youtube');
    } else if ((event.target as HTMLInputElement).value.includes('instagram')) {
      this.icon?.setValue('instagram');
    } else if ((event.target as HTMLInputElement).value.includes('twitter')) {
      this.icon?.setValue('twitter');
    } else if ((event.target as HTMLInputElement).value.includes('twitch')) {
      this.icon?.setValue('twitch');
    } else if ((event.target as HTMLInputElement).value.includes('tiktok')) {
      this.icon?.setValue('tiktok');
    } else {
      this.icon?.setValue('website');
    }
  }

}

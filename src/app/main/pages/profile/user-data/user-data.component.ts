import { Component, Input, OnInit } from '@angular/core';
import { UserDataModel } from '../models/user-data.model';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input() userData: UserDataModel|undefined;
  @Input() isCreatorView: boolean|undefined;

  socialNetworks: any[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loadSocialNetworks(this.userData?.socialNetworks);
  }

  private loadSocialNetworks(socialNetworks: string[] | undefined) {
    if (socialNetworks) {
      for (const network of socialNetworks) {
        const networkElement = {
          link: network,
          icon: this.getPlatformOnLink(network),
          name: network.substring(network.lastIndexOf('/') + 1)
        };
        this.socialNetworks.push(networkElement);
      }
    }
  }

  private getPlatformOnLink(network: string): string {
    if (network.includes('youtube')) {
      return 'youtube';
    }
    if (network.includes('instagram')) {
      return 'instagram';
    }
    if (network.includes('tiktok')) {
      return 'tiktok';
    }
    if (network.includes('twitter')) {
      return 'twitter';
    }
    return 'web';
  }

  openSocialMediaLink(link: string) {
    window.open(link.includes('https://') ? link : 'https://' + link, '_blank');
  }

  public editProfile() {
    this.dialog.open(EditProfileModalComponent, {
      width: '600px',
    });
  }

}

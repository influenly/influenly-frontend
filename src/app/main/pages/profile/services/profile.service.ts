import { Injectable } from "@angular/core";

@Injectable()
export class ProfileService {

    public loadSocialNetworks(socialNetworks: string[] | undefined) {
        let transformedSocialNetworks = [];
        if (socialNetworks) {
          for (const network of socialNetworks) {
            const networkElement = {
              link: network,
              icon: this.getPlatformOnLink(network),
              name: network.substring(network.lastIndexOf('/') + 1)
            };
            transformedSocialNetworks.push(networkElement);
          }
        }
        return transformedSocialNetworks;
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
}
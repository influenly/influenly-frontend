import { Injectable } from "@angular/core";

@Injectable()
export class LocationUtilsService {

    public changePreviousPage(window: any, location: any, newPathname: string) {
        history.pushState(null, document.title, location.pathname);
        window.addEventListener("popstate", function() {
          if(location.pathname === newPathname) {
            history.pushState(null, document.title, location.pathname);
          }
        }, false);
      }
      
}
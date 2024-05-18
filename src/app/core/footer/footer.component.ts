import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showFooter: boolean = false;
  pathsToShowFooter: string[] = ['/', '/how-it-works', '/about-us', '/terms-of-service', '/privacy-policy'];
  navigationEndSubs: Subscription | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.showFooter = this.pathsToShowFooter.includes(this.router.url);
    this.navigationEndSubs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async (event: any) => {
        this.showFooter = this.pathsToShowFooter.includes(event.url);
    });
  }

  ngOnDestroy() {
    if (this.navigationEndSubs) this.navigationEndSubs.unsubscribe();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}

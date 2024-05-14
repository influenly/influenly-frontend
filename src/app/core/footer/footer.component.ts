import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isLanding: boolean = false;
  navigationEndSubs: Subscription | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isLanding = this.router.url == '/';
    this.navigationEndSubs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async (event: any) => {
        this.isLanding = event.url == '/';
    });
  }

  ngOnDestroy() {
    if (this.navigationEndSubs) this.navigationEndSubs.unsubscribe();
  }
}

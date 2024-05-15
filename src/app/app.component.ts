import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'influenly-frontend';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use(navigator.language.substring(0, 2));

    //To set --mouse-x and --mouse-y on styles.scss
    const root = document.documentElement;
    document.addEventListener('mousemove', evt => {
        let x = evt.clientX / innerWidth;
        let y = evt.clientY / innerHeight;

        root.style.setProperty('--mouse-x', x.toString());
        root.style.setProperty('--mouse-y', y.toString());
    });
  }
}

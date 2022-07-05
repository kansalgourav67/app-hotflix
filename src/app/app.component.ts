import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'app-hotflix';

  constructor(
    private translateService: TranslateService,
    private toastService: ToastService
  ) {
    translateService.addLangs(['en', 'hi']);
    translateService.setDefaultLang('en');

    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|hi/) ? browserLang : 'en');
  }

  public clearLocalStorage(): void {
    localStorage.clear();
    this.toastService.showToastMessage(
      'Local storage cleared successfully',
      'mat-warn'
    );
  }
}

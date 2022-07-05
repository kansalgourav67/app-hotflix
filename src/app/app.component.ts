import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './core/services/app.service';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Hotflix';
  public isLoading: boolean = false;

  constructor(
    private translateService: TranslateService,
    private appService: AppService,
    private toastService: ToastService
  ) {
    translateService.addLangs(['en', 'hi']);
    translateService.setDefaultLang('en');

    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|hi/) ? browserLang : 'en');

    this.enableLoader();
  }

  public clearLocalStorage(): void {
    localStorage.clear();
    this.toastService.showToastMessage(
      'Local storage cleared successfully',
      'mat-warn'
    );
  }

  private enableLoader(): void {
    this.appService.isLoading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}

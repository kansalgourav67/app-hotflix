import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PrimeSubscriptionService } from 'src/app/core/services/prime-subscription.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PrimeMembershipDialogComponent } from '../prime-membership-dialog/prime-membership-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isAuthenticated: boolean;
  public language = 'English';
  public hasPrimeSubscription: boolean = false;
  public user: User;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
    public dialog: MatDialog,
    private primeSubscriptionService: PrimeSubscriptionService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authService.getAuthenticatedUser();
      this.hasPrimeSubscription =
        this.primeSubscriptionService.hasUserPrimeSubscription(this.user);
    }

    this.authService.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.user = this.authService.getAuthenticatedUser();
      this.isAuthenticated = authenticated;
    });

    this.primeSubscriptionService.optInPrimeSubscription$.subscribe(
      (hasPrimeSubscription: boolean) => {
        this.hasPrimeSubscription = hasPrimeSubscription;
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onLogout(): void {
    const activeUser = this.user;
    this.authService.logoutUser(this.user);
    this.toastService.showToastMessage('Logged Out Successfully', 'mat-accent');

    // clear prime membership info of user from localstorage as well.
    if (this.primeSubscriptionService.hasUserPrimeSubscription(activeUser)) {
      this.deactivatePrimeMemberhip();
    }
  }

  public languageSelected(language: string): void {
    this.language = language == 'en' ? 'English' : 'Hindi';
    this.translate.use(language);
  }

  public primeSubscriptionClickEvent(): void {
    if (this.isAuthenticated) {
      this.dialog.open(PrimeMembershipDialogComponent);
    } else {
      this.toastService.showToastMessage('Please login first', 'mat-warn');
      this.router.navigateByUrl('login');
    }
  }

  private deactivatePrimeMemberhip(): void {
    setTimeout(() => {
      this.primeSubscriptionService.deactivateUserPrimeMembership();
      this.toastService.showToastMessage(
        'Prime membership expired. Renew it again',
        'mat-warn'
      );
    }, 2500);
  }
}

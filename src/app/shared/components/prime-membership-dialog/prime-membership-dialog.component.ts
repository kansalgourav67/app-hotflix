import { Component, OnInit } from '@angular/core';
import { PrimeSubscription, User } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PrimeSubscriptionService } from 'src/app/core/services/prime-subscription.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-prime-membership-dialog',
  templateUrl: './prime-membership-dialog.component.html',
  styleUrls: ['./prime-membership-dialog.component.scss'],
})
export class PrimeMembershipDialogComponent implements OnInit {
  public user: User;

  constructor(
    private primeSubscriptionService: PrimeSubscriptionService,
    private authService: AuthenticationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
  }

  public joinPrimeMembership(): void {
    let subscription: PrimeSubscription = {
      emailId: this.user.emailId,
      validity: 30,
      primeSubscription: true,
    };

    this.primeSubscriptionService.takePrimeSubscription(subscription);
    this.toastService.showToastMessage(
      'Prime membership activated successfully',
      'mat-accent'
    );
  }
}

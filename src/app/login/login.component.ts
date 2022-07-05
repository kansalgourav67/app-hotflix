import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../core/services/app.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isAuthenticated: boolean;
  public loginFailed: boolean = false;
  public isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const { emailId, password } = this.loginForm.value;

    this.appService.isLoading(true);
    setTimeout(() => {
      this.loginUser(emailId, password);
      this.appService.isLoading(false);
    }, 2000);
  }

  private loginUser(emailId: string, password: string): void {
    if (this.authenticationService.loginUser(emailId, password)) {
      this.isAuthenticated = true;
      this.router.navigate(['']);
    } else {
      this.isAuthenticated = false;
      this.loginFailed = true;
    }
  }
}

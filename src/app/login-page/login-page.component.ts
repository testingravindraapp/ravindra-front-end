import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material';
import { LoginService } from '../services/login.service';
import { ILogin } from '../interfaces/login';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private login$: Subscription;
  public loginForm: FormGroup;
  public loginData: ILogin;


  constructor(private formBuilder: FormBuilder, 
  private router: Router, 
  private loginService: LoginService,
  private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public loginUser(user): void {
     this.ngxService.startLoader('loader-01');
    this.login$ = this.loginService.loginUser(user).subscribe(
      (data: ILogin) => {
        this.loginData = data;
        console.log(this.loginData);
        if (this.loginData.token) {
          localStorage.setItem('token', this.loginData.token);
          this.router.navigate(['/contractors']);   // after successful login navigate to contractors page.
        } else {
          this.router.navigate(['/login']);
          alert('Invalid Username and Password');
        }
        this.ngxService.stopLoader('loader-01');
      },
      error => {
         this.ngxService.stopLoader('loader-01');
        alert('Invalid userId or password')
      }
    );
  }

  ngOnDestroy() {
  }

}

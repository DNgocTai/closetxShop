import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../services/localstorage.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  loginFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  authMessage: string = 'Email hoặc mật khẩu không đúng';

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _localstorageService: LocalstorageService,
    private _toast: HotToastService,
    private _router: Router
  ) {}

  initLoginForm() {
    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this._auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .pipe(
        this._toast.observe({
          loading: 'Đăng nhập...',
          success: 'Đăng nhập thành công',
          error: ({ error }) => `Có lỗi xảy ra: ${error.message} `,
        })
      )
      .subscribe(
        (user) => {
          this.authError = false;
          this._localstorageService.setToken(user.access_token);
          this._auth.startRefreshTokenTimer();
          this._router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = error.message;
          }
        }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
  /*
    ----------------------------------------
    ========== visibility Toggle ===========
    ----------------------------------------
  */
  visibilityToggle() {
    if (this.passwordVisible == false) {
      this.passwordVisible = true;
    } else {
      this.passwordVisible = false;
    }
  }

  ngOnInit(): void {
    this.initLoginForm();
  }
}

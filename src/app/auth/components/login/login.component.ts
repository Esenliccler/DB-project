import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  show: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    this.loginForm = this._fb.nonNullable.group<{
      email: FormControl;
      password: FormControl;
    }>({
      email: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    localStorage.removeItem('lieferspatz-user');
  }

  ngOnInit() {}
  public showPassword(): void {
    this.show = !this.show;
  }
  public login(): void {
    this._authService
      .login(this.loginForm.value['email'], this.loginForm.value['password'])
      .pipe(
        take(1),
        tap((authResponse) => {
          localStorage.setItem(
            'lieferspatz-user',
            JSON.stringify(authResponse)
          );
          //this.loadingButton.set(false);
          this._router.navigate(['home']);
        }),
        catchError((error: any): Observable<any> => {
          //this.errorMessage.set(error.error.message);
          //this.loadingButton.set(false);
          return of({});
        })
      )
      .subscribe();
  }
}

import { InputTextModule } from 'primeng/inputtext';
import { take, tap } from 'rxjs';

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, ReactiveFormsModule, InputTextModule],
  providers: [AuthService],
})
export class SignUpComponent {
  confirmPasswordValidatorCustomer: ValidatorFn = (control) => {
    if (!!this.signUpFormCustomer) {
      const confirmPassword = control.value;
      const { password } = this.signUpFormCustomer.value;
      return password === confirmPassword
        ? {}
        : { error: 'password not confirmed' };
    }
    return {};
  };
  confirmPasswordValidatorRestaurant: ValidatorFn = (control) => {
    if (!!this.signUpFormRestaurant) {
      const confirmPassword = control.value;
      const { password } = this.signUpFormRestaurant.value;
      return password === confirmPassword
        ? {}
        : { error: 'password not confirmed' };
    }
    return {};
  };
  signUpFormCustomer: FormGroup;
  signUpFormRestaurant: FormGroup;
  show: boolean = false;
  errorMessage: WritableSignal<string | null> = signal(null);

  loadingButton: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    this.signUpFormCustomer = this._fb.nonNullable.group({
      email: this._fb.nonNullable.control<string | null>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      confirm: this._fb.nonNullable.control<string | null>('', [
        Validators.required,
        this.confirmPasswordValidatorCustomer,
      ]),
      name: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      lastName: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      str: this._fb.nonNullable.control<string | null>('', Validators.required),
      plz: this._fb.nonNullable.control<string | null>('', Validators.required),
    });
    this.signUpFormRestaurant = this._fb.nonNullable.group({
      email: this._fb.nonNullable.control<string | null>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      confirm: this._fb.nonNullable.control<string | null>('', [
        Validators.required,
        this.confirmPasswordValidatorRestaurant,
      ]),
      name: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      str: this._fb.nonNullable.control<string | null>('', Validators.required),
      plz: this._fb.nonNullable.control<string | null>('', Validators.required),
    });
    localStorage.removeItem('lieferspatz-user');
  }

  public signUpCustomer(): void {
    const { confirm, ...data } = this.signUpFormCustomer.value;
    console.log(data);
    this._authService
      .signUpCustomer(data)
      .pipe(
        take(1),
        tap(() => {
          this._authService
            .login({
              email: this.signUpFormCustomer.controls['email'].value,
              password: this.signUpFormCustomer.controls['password'].value,
            })
            .subscribe((authResponse) => {
              localStorage.setItem(
                'lieferspatz-user',
                JSON.stringify(authResponse)
              );
              this.loadingButton.set(false);
              this._router.navigate(['home']);
            });
        })
      )
      .subscribe();
  }
  public signUpRestaurant(): void {
    const { confirm, ...data } = this.signUpFormRestaurant.value;
    console.log(data);
    this._authService
      .signUpRestaurant(data)
      .pipe(
        take(1),
        tap(() => {
          this._authService
            .login({
              email: this.signUpFormRestaurant.controls['email'].value,
              password: this.signUpFormRestaurant.controls['password'].value,
            })
            .subscribe((authResponse) => {
              localStorage.setItem(
                'lieferspatz-user',
                JSON.stringify(authResponse)
              );
              this.loadingButton.set(false);
              this._router.navigate(['home']);
            });
        })
      )
      .subscribe();
  }

  public showPassword(): void {
    this.show = !this.show;
  }
}

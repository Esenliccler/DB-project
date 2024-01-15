import { InputTextModule } from 'primeng/inputtext';
import { catchError, Observable, of, take, tap } from 'rxjs';

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// import { AuthResponseAdapter } from 'src/app/adapters/auth/auth.adapter';
// import { SignUpDTO } from 'src/app/DTOs/auth/sign-up.dto';
// import { AuthResponseModel } from 'src/app/models/auth-models/auth-response.model';
// import { GroupService } from 'src/app/shared/services/group.service';
// import { Gender } from 'src/types/types';

// import { AuthService } from '../services/auth.service';

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
    private readonly _authService: AuthService // private readonly _groupService: GroupService,
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
    localStorage.removeItem('user');
  }

  public signUpCustomer(): void {
    const { confirm, ...data } = this.signUpFormCustomer.value;
    console.log(data);
    //this._authService.signUpCustomer(data);
  }
  public signUpRestaurant(): void {
    const { confirm, ...data } = this.signUpFormRestaurant.value;
    console.log(data);
    //this._authService.signUpRestaurant(data);
  }

  public showPassword(): void {
    this.show = !this.show;
  }
}

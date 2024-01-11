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
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// import { AuthResponseAdapter } from 'src/app/adapters/auth/auth.adapter';
// import { SignUpDTO } from 'src/app/DTOs/auth/sign-up.dto';
// import { AuthResponseModel } from 'src/app/models/auth-models/auth-response.model';
// import { GroupService } from 'src/app/shared/services/group.service';
// import { Gender } from 'src/types/types';

// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'najeb-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, ReactiveFormsModule, InputTextModule],
  // providers: [AuthService, AuthResponseAdapter, GroupService],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  show: boolean = false;
  errorMessage: WritableSignal<string | null> = signal(null);

  loadingButton: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router
  ) // private readonly _authService: AuthService,
  // private readonly _groupService: GroupService,
  {
    this.signUpForm = this._fb.nonNullable.group({
      email: this._fb.nonNullable.control<string | null>('', [
        Validators.required,
        Validators.email,
      ]),
      password: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      confirm: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      name: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      lastName: this._fb.nonNullable.control<string | null>(
        '',
        Validators.required
      ),
      // gender: this._fb.nonNullable.control<Gender>('MALE', Validators.required),
    });
    localStorage.removeItem('user');
  }

  public getSignUpFormControlValue(
    fieldName: 'email' | 'password' | 'name' | 'lastName' | 'confirm'
  ): string {
    return this.signUpForm.value[fieldName];
  }

  get emailControl(): FormControl {
    return this.signUpForm.controls['email'] as FormControl<string>;
  }

  get passwordControl(): FormControl {
    return this.signUpForm.controls['password'] as FormControl<string>;
  }

  public signUp(): void {
    //   // const userInputs: SignUpDTO = {
    //     email: this.getSignUpFormControlValue('email'),
    //     password: this.getSignUpFormControlValue('password'),
    //     name: this.getSignUpFormControlValue('name'),
    //     lastName: this.getSignUpFormControlValue('lastName'),
    //     gender: 'MALE',
    //     birthday: '1999-01-01T10:10:10.000Z',
    //     phone: '963912343533',
    //   };
    //   this.loadingButton.set(true);
    //   // this._authService
    //     // .signUp(userInputs)
    //     // .pipe(
    //       tap((user: AuthResponseModel) => {
    //         localStorage.setItem('user', JSON.stringify(user));
    //         this._groupService
    //           .createGroup(this.getSignUpFormControlValue('name'))
    //           .pipe(
    //             take(1),
    //             tap((group: { id: number; name: string; creatorId: number }) => {
    //               this._groupService
    //                 .addUsersToGroup(group.id, [group.creatorId])
    //                 .pipe(take(1))
    //                 .subscribe();
    //             }),
    //           )
    //           .subscribe();
    //         this.loadingButton.set(false);
    //         this._router.navigate(['home']);
    //       }),
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       catchError((error: any): Observable<any> => {
    //         this.loadingButton.set(false);
    //         this.errorMessage.set(error.error.message);
    //         return of({});
    //       }),
    //       take(1),
    //     )
    //     .subscribe();
  }

  public showPassword(): void {
    this.show = !this.show;
  }
}

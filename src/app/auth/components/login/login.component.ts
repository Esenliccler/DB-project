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

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, NgIf, RouterLink],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  show: boolean = false;
  _fb2 = Inject(FormBuilder)

  constructor(private readonly _fb: FormBuilder, private readonly _router: Router) {
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
  }

  ngOnInit() {}
  public showPassword(): void {
    this.show = !this.show;
  }
  public login(): void {
    console.log(this.loginForm);
    this._router.navigate(['sign-up'])
  }
}

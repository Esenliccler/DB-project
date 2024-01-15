import { SignUpComponent } from './../components/sign-up/sign-up.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_ENDPOINTS = { login: '/login', signUp: '/sign-up' };

  constructor(private readonly _http: HttpClient) {}

  public login(data: any) {
    this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.login}`,
      data
    );
    return of({ userName: 'fadi', token: '1234' });
  }
  public signUpCustomer(data: any) {
    return this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.signUp}`,
      data
    );
  }
  public signUpRestaurant(data: any) {
    return this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.signUp}`,
      data
    );
  }
}

import { SignUpComponent } from './../components/sign-up/sign-up.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_ENDPOINTS = { login: '/login', signUp: '/sign-up' };

  constructor(private readonly _http: HttpClient) {}

  public login(data: any): Observable<{ userName: string; token: string }> {
    this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.login}`,
      data
    );
    return of({ userName: 'fadi', token: '1234' });
  }

  public signUpCustomer(
    data: any
  ): Observable<{ userName: string; token: string }> {
    this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.signUp}`,
      data
    );
    return of({ userName: 'susu', token: '2213' });
  }

  public signUpRestaurant(
    data: any
  ): Observable<{ userName: string; token: string }> {
    this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.signUp}`,
      data
    );
    return of({ userName: 'sussdsu', token: '221ds23' });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_ENDPOINTS = { login: '/login', signUp: '/sign-up' };

  constructor(private readonly _http: HttpClient) {}

  public login(
    email: string,
    password: string
  ): Observable<{ userName: string; token: string }> {
    const body = { email: email, password: password };
    this._http.post<any>(
      `${environment.CURRENT_DOMAIN}${this.AUTH_ENDPOINTS.login}`,
      body
    );
    return of({ userName: 'fadi', token: '1234' });
  }
}

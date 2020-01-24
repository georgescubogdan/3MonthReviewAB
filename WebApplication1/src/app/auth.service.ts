import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FirmDataApiResult } from './util/identity';
import { Router } from '@angular/router';
import { UserData } from './dashboard/models/user-data';
import { ResetPassData } from './dashboard/models/reset-pass-data';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable navItem source
  private _userNameSubject: Subject<string> = new ReplaySubject<string>(1);
 // public userData$: Observable<UserData> = this._userDataSubject.asObservable();
  public userName$: Observable<string> = this._userNameSubject.asObservable();

  constructor(private http: HttpClient, private _router: Router) {
    this.getCurrentUserName()
        .then(name => {
          console.log(name);
          this._userNameSubject.next(name);
        })
        .catch(err => {
          console.log(err);
        });
  }

  /*test1@gmail.com*/
  /*123Asus!@#*/
  /*cui: 9646987*/


  getCurrentUserData(): Promise<UserData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
        .post<UserData>(environment.taskApiUrl + '/GetUserData', '', {responseType: 'json', headers})
        .toPromise();
  }

  getCurrentUserRoles(): Promise<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
        .post<string[]>(environment.taskApiUrl + '/GetUserRole', '', {responseType: 'json', headers})
        .toPromise();
  }

  getCurrentUserName(): Promise<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
        .post(environment.taskApiUrl + '/GetUserFullName', '', {responseType: 'text', headers})
        .toPromise();
  }

  changePassword(email, oldPassword, newPassword) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, oldPassword, newPassword});
    return this.http
      .put(environment.taskApiUrl + '/ChangePassword', body, {responseType: 'text', headers})
      .toPromise();
  }

  shouldChangePassword() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(environment.taskApiUrl + '/GetShouldChangePassword' , {responseType: 'json', headers})
      .toPromise();
  }

  login(email, password) {
    const body = JSON.stringify({ email, password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(
        environment.taskApiUrl + '/Login',
        body,
        { headers , responseType: 'text'}
      )
      .toPromise()
      .then(async authKey => {
        localStorage.setItem('auth_key', authKey);
        this.getCurrentUserName()
        .then(name => {
          this._userNameSubject.next(name);
        })
        .catch(err => {
          console.error(err);
        });

      });
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('auth_key') != null && !this.isTokenExpired();
  }
  isTokenExpired(): boolean {
    return false;
  }

   logout() {
    localStorage.removeItem('auth_key');
    this._userNameSubject.next(null);
    this._router.navigate(['/login']);
  }

}

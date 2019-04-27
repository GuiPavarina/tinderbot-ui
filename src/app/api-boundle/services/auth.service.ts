import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Login } from '../models/login';
import { SignUp } from '../models/singup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Observable<User> {
    return this.currentUserSubject.pipe(
      map(
        (value) => {
          console.log(value);
          return value;
        },
        (error) => {
          return error;
        }
      )
    );
  }

  register(signup: SignUp): Observable<Boolean> {
    // TODO: remove hardcoded link
    return this.http
      .post<any>(`http://localhost:8080/api/auth/signup`, signup)
      .pipe(
        map(
          () => {
            return true;
          },
          () => {
            return false;
          }
        )
      );
  }

  login(login: Login): Observable<User> {
    // TODO: remove hardcoded link
    return this.http
      .post<User>(`http://localhost:8080/api/auth/signin`, login)
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.accessToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

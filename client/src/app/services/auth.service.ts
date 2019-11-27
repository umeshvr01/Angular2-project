import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = 'http://localhost:8080';
  authToken;
  user;
  options;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': this.authToken
      })
    };
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user);
  }

  // checkUsername(username) {
  //   return this.http.get(this.domain + 'authentication/checkUsername/' + username);
  // }

  // checkEmail(email) {
  //   return this.http.get(this.domain + 'authentication/checkEmail/' + email);
  // }

  login(user) {
    return this.http.post(this.domain + '/authentication/login', user);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken;
    this.user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.options);
  }

  loggedIn() {
    const token: string = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }


}

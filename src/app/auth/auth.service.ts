import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor() { }

  isAuthenticated() {
    this.isLoggedIn = sessionStorage.getItem('canAccess') === "true"
    return this.isLoggedIn;
  }
}
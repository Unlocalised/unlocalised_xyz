import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService{

  constructor(private http: HttpClient) {}

  login(email, password){
    return this.http.post<any>('/api/admin/login', {email, password});
  }

  logout(user, token){
    return this.http.post('/api/admin/logout',{
      token,
      user
    });
  }

  isLoggedIn(){
    // Fetch local storage
    const localToken = localStorage.getItem('token');

    if(!localToken){
      return false;
    }else if(this.tokenExpired(localToken)) {
      return false;
    }else{
      // Token exists in storage and also is valid
      return true;
    }

  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}

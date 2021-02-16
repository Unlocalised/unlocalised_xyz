import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // modify request
    // Add auth headers
    const token = localStorage.getItem("token");
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  return next.handle(reqWithAuth)
  .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // HTTP response
        }
      }, error => {
        // http response status code
        if(error.status === 401){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/admin']);
        }
      })
    );


  }
}
